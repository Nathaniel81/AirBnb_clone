from rest_framework import viewsets, status
from .models import Property, Category
from .serializers import PropertySerializer, CategorySerializer
from rest_framework.response import Response
from accounts.authenticate import CustomAuthentication
from rest_framework.permissions import IsAuthenticated


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        print(request.data)
        if not user or user.is_anonymous:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data.copy()

        data['host'] = request.user.id

        details = data.pop('details', None)
        if details:
            data.update({
                'title': details.get('title'),
                'description': details.get('description'),
                'price': details.get('price'),
                'guests': details.get('guests'),
                'bedrooms': details.get('rooms'),
                'bathrooms': details.get('bathrooms'),
                'photo': details.get('fileUrl')
            })
        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
