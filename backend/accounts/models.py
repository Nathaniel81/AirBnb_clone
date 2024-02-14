from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_host = models.BooleanField(default=False)
    email = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
