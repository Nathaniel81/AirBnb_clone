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

class Location(models.Model):
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
    amenities = models.JSONField(default=list)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        # Delete associated listing images
        for image in self.images.all():
            if image.image:
                destroy(image.image.public_id)
            image.delete()
        
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.title

class ListingImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = CloudinaryField('image', null=True, blank=True)

    def __str__(self):
        return f"image of {self.property.title}"

class Reservation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reservation for property '{self.property.title}' by user '{self.user.username}'"

class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.PositiveSmallIntegerField()
    