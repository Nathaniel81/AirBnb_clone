"""
Module for handling JSON Web Tokens (JWT) in the AirBnB clone web app.

This module provides functions to fetch the JSON Web Key Set (JWKS) and decode JWTs.
"""

import jwt
import requests
from django.conf import settings


def get_jwks():
    """
    Fetches the JSON Web Key Set (JWKS) from the specified URL.

    Returns:
        dict: The JWKS containing public keys.
    """

    response = requests.get(f"https://{settings.KINDE_DOMAIN}/.well-known/jwks")
    return response.json()

def decode_jwt(token):
    """
    Decodes a JSON Web Token (JWT) using the provided token and JWKS.

    Args:
        token (str): The JWT to decode.

    Returns:
        dict: The decoded JWT payload.
    
    Raises:
        ValueError: If the public key is not found.
    """

    jwks = get_jwks()
    header = jwt.get_unverified_header(token)
    key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            key = jwt.algorithms.RSAAlgorithm.from_jwk(jwk)
            break
    if key is None:
        raise ValueError('Public key not found.')
    
    # Allow 60 seconds of leeway for clock skew
    decoded = jwt.decode(token, key=key, 
            audience=settings.KINDE_CLIENT_ID, algorithms=['RS256'], leeway=60)
    return decoded
