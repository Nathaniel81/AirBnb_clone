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
