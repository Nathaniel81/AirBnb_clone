from django.db import models
from accounts.models import User


class AmenityType(models.Model):
    name = models.CharField(max_length=100)

class PropertyType(models.Model):
    name = models.CharField(max_length=100)

class Room(models.Model):
    name = models.CharField(max_length=200)
    capacity = models.PositiveSmallIntegerField()
    description = models.TextField(blank=True, null=True)

class Country(models.Model):
    name = models.CharField(max_length=100)

class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(Country, on_delete=models.CASCADE)

class Property(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    available_start = models.DateField()
    available_end = models.DateField()
    photos = models.ManyToManyField('Photo')
    property_type = models.ForeignKey(PropertyType, on_delete=models.SET_NULL, null=True)
    rooms = models.ManyToManyField(Room)
    amenities = models.ManyToManyField(AmenityType, through='Amenity')
    guests = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Amenity(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_amenities')
    amenity_type = models.ForeignKey(AmenityType, on_delete=models.CASCADE, default=None, related_name='amenity_type')

class Booking(models.Model):
    guest = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    rooms = models.ManyToManyField(Room, through='RoomBooking')
    total_guests = models.PositiveSmallIntegerField()

class RoomBooking(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    adults = models.PositiveSmallIntegerField()
    children = models.PositiveSmallIntegerField()

class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.PositiveSmallIntegerField()

class Photo(models.Model):
    url = models.ImageField()
    alt_text = models.CharField(max_length=200)

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    properties = models.ManyToManyField(Property)
