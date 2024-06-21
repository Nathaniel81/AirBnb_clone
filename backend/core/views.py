from accounts.authenticate import AllowAnyAuthentication, CustomAuthentication
from accounts.models import User
from accounts.permissions import AllowAnonymousGetPermission
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction

from .models import Location, Category, Property, Reservation, ListingImage
from .serializers import (
    CategorySerializer, 
    LocationSerializer,
    PropertyCreateSerializer,
    PropertyListSerializer,
    PropertyDetailSerializer,
    ReservationSerializer
)

from rest_framework.permissions import SAFE_METHODS
from .pagination import PropertyPagination
import json


class PropertyViewSet(viewsets.ModelViewSet):
    """
    Viewset for managing properties.
    """

    queryset = Property.objects.select_related('category', 'host', 'location').all()
    permission_classes = [AllowAnonymousGetPermission]
    pagination_class = PropertyPagination

    def get_authenticators(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAnyAuthentication()]
        return [CustomAuthentication()]

    def get_serializer_class(self):
        if self.action == 'list':
            return PropertyListSerializer
        elif self.action == 'create':
            return PropertyCreateSerializer
        elif self.action == 'retrieve':
            return PropertyDetailSerializer
        else:
            return super().get_serializer_class()

    def filter_queryset(self, queryset):
        category = self.request.query_params.get('category')
        country = self.request.query_params.get('country')
        guests = self.request.query_params.get('guests')
        rooms = self.request.query_params.get('rooms')
        bathrooms = self.request.query_params.get('bathrooms')

        if category:
            queryset = queryset.filter(category__name=category)
        if country:
            queryset = queryset.filter(location__country=country)
        if guests:
            queryset = queryset.filter(guests=guests)
        if rooms:
            queryset = queryset.filter(bedrooms=rooms)
        if bathrooms:
            queryset = queryset.filter(bathrooms=bathrooms)
    
        return queryset.order_by('-created_at')

    def create(self, request, *args, **kwargs):
        user = request.user
        if not user or user.is_anonymous:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data.copy()
        details = data.pop('details', None)
        location_data = data.pop('location', None)
        category_id = data.pop('category', None)[0]
        amenities = data.pop('amenities', None)[0]
        photos = data.pop('photos', None)

        if isinstance(location_data, list) and len(location_data) > 0:
            location_data = json.loads(location_data[0])

        if isinstance(details, list) and len(details) > 0:
            details = json.loads(details[0])

        try:
            with transaction.atomic():
                new_location, created = Location.objects.get_or_create(
                    country=location_data.get('country'), 
                    continent=location_data.get('continent')
                )

                if details:
                    data.update({
                        'category': category_id[0],
                        'title': details.get('title'),
                        'description': details.get('description'),
                        'price': details.get('price'),
                        'guests': details.get('guests'),
                        'bedrooms': details.get('rooms'),
                        'bathrooms': details.get('bathrooms'),
                        'location': new_location.id,
                        'amenities': amenities
                    })

                validated_data = data.copy()
                validated_data['host'] = user.id

                serializer = self.get_serializer(data=validated_data)
                serializer.is_valid(raise_exception=True)
                property_instance = serializer.save()

                if photos:
                    for photo in photos:
                        ListingImage.objects.create(property=property_instance, image=photo)

                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    """
    Viewset for managing categories.
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

from emails.tasks import send_email

class ReservationViewsets(viewsets.ModelViewSet):
    """
    Viewset for managing reservations.
    """

    # authentication_classes = [CustomAuthentication]
    # permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer

    # def get_permissions(self):
    #     if self.action == 'list':
    #         return [permissions.AllowAny()]
    #     return super().get_permissions()

    def get_queryset(self):
        property_id = self.request.query_params.get('property_id', None)
        if property_id:
            return Reservation.objects.select_related('user', 'property').filter(property_id=property_id)
        return Response({'error': 'Property required'}, status=status.HTTP_400_BAD_REQUEST)
    
    def create(self, request, *args, **kwargs):
        # user = request.user
        user = User.objects.get(id=2)
        data = request.data.copy()

        if not data.get('property'):
            return Response({'error': 'Property required'}, status=status.HTTP_400_BAD_REQUEST)

        if not user or user.is_anonymous:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        data['user'] = user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Trigger the email task
        send_email.delay(
            user_email=user.email, 
            property_title=serializer.validated_data['property'].title
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
