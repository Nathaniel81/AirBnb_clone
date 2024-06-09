from datetime import timedelta

import requests
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from cloudinary.uploader import upload
from .serializers import UserSerializer
from .models import User
from .utils import decode_jwt

from rest_framework import generics, status, exceptions
from core.serializers import PropertyDetailSerializer
from core.models import Property, Reservation
from .authenticate import CustomAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt import tokens


def login(request):
    """
    Redirects the user to the Kinde OAuth2 authorization URL.

    Constructs the authorization URL with the necessary parameters and redirects
    the user to it for authentication.

    Parameters
    ----------
    request : HttpRequest
        The HTTP request object.

    Returns
    -------
    HttpResponseRedirect
        A response object that redirects the user to the Kinde OAuth2 authorization URL.
    """

    oauth_domain = settings.KINDE_DOMAIN
    client_id = settings.CLIENT_ID
    redirect_uri = settings.REDIRECT_URI
    scope = "openid profile email"
    state = "abcdefgh"

    auth_url = f"https://{oauth_domain}/oauth2/auth"
    auth_url += f"?response_type=code&client_id={client_id}"
    auth_url += f"&redirect_uri={redirect_uri}&scope={scope}&state={state}"

    return redirect(auth_url)

class KindeCallbackView(APIView):
    """
    Handles Kinde OAuth2 callback.

    Exchanges the authorization code for tokens, decodes the ID token for user info, 
    creates or updates the user in the database, uploads the user's picture to Cloudinary 
    if necessary, generates JWT tokens, sets them as httpOnly cookies, and returns 
    serialized user data.

    Methods
    -------
    get(request):
        Processes the authorization code and returns user data.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        code = request.GET.get('code')
        token_url = f"https://{settings.KINDE_DOMAIN}/oauth2/token"
        data = {
            'client_id': settings.CLIENT_ID,
            'client_secret': settings.CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'redirect_uri': settings.REDIRECT_URI,
            'code': code,
        }

        response = requests.post(token_url, data=data)
        token_data = response.json()

        # Decode the ID token
        id_token = token_data['id_token']
        user_info = decode_jwt(id_token)

        first_name = user_info.get('given_name', '')
        last_name = user_info.get('family_name', '')
        email = user_info.get('email', '')
        picture_url = user_info.get('picture', '')

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'first_name': first_name,
                'last_name': last_name,
            }
        )

        if created or not user.picture:
            if picture_url:
                upload_result = upload(picture_url)
                user.picture = upload_result.get('url')
                user.save()

        refresh_token = RefreshToken.for_user(user)
        access_token = str(refresh_token.access_token)

        user_serializer = UserSerializer(user)

        response_data = {
            'user': user_serializer.data,
        }

        response = Response(response_data)

        # Set httpOnly cookies
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=access_token,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=str(refresh_token),
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        return response

class UserFavoritesView(APIView):
    """
    Handles user favorites operations.

    Retrieves and modifies the user's favorites of properties. Supports fetching
    the favorites and toggling property status (add/remove).
    """

    serializer_class = PropertyDetailSerializer
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user or user.is_anonymous:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        properties = user.favorites.prefetch_related('category', 'host', 'address').all()
        serializer = PropertyDetailSerializer(properties, many=True)
        return Response({'favorites': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        property_id = request.data.get('property_id')
        print(property_id)

        if not property_id:
            return Response({'error': 'Property id is not provided'}, status=status.HTTP_400_BAD_REQUEST)
        if not user or user.is_anonymous:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            property = Property.objects.select_related('category', 'host', 'address').get(id=property_id)
        except Property.DoesNotExist:
            return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)

        if property in user.favorites.all():
            user.favorites.remove(property)
            action = 'removed from'
        else:
            user.favorites.add(property)
            action = 'added to'
        
        serializer = PropertyDetailSerializer(
            user.favorites.prefetch_related('category', 'host', 'address').all(), many=True)

        return Response({
            'message': f'Property {action} wish list',
            'favorites': serializer.data
        }, status=status.HTTP_200_OK)

class LogoutView(APIView):
    """
    Custom view for logging out users by blacklisting refresh tokens and deleting cookies.
    """

    def post(self, request):
        """
        Handle POST request for logging out users.

        This method blacklists the refresh token, deletes authentication cookies,
        and returns a response indicating successful logout.

        Args:
            request (HttpRequest): The request object.

        Returns:
            Response: The HTTP response.
        """

        try:
            refreshToken = request.COOKIES.get(
                settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            # Instantiate a RefreshToken object
            token = tokens.RefreshToken(refreshToken)
            token.blacklist()

            response = Response({'LoggedOut'})
            # Delete authentication cookies
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])

            return response

        except tokens.TokenError as e:
            # If there's a TokenError, still construct a response and delete cookies
            response = Response({'LoggedOut'})
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        
            return response
        except Exception as e:
            print(e)
            raise exceptions.ParseError("Invalid token")

class UserPropertiesList(generics.ListAPIView):
    """
    Lists properties owned by the authenticated user.

    Retrieves a queryset of properties associated with the user, including related
    data such as category, address, and host information.
    """

    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = PropertyDetailSerializer

    def get_queryset(self):
        user = self.request.user
        return Property.objects.select_related('category', 'address', 'host').filter(host=user)

class UserReservationsAPIView(APIView):
    """
    Lists properties reserved by the authenticated user.

    Retrieves a queryset of properties reserved by the user. The queryset includes
    distinct properties to avoid duplicates.
    """

    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        properties = Property.objects.filter(reservation__user=user).distinct()
        serializer = PropertyDetailSerializer(properties, many=True)
        return Response(serializer.data)
