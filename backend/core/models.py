from django.db import models
from accounts.models import User
from cloudinary.models import CloudinaryField


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    title = models.CharField(max_length=200)
    picture_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name

class Address(models.Model):
    continent = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    province = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.city}, {self.country}, {self.continent}"

class Property(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    guests = models.PositiveSmallIntegerField(default=0)
    bedrooms = models.PositiveSmallIntegerField(default=0)
    bathrooms = models.PositiveSmallIntegerField(default=0)
    photo = models.URLField(max_length=200, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Reservation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    createdAt = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.PositiveSmallIntegerField()
    