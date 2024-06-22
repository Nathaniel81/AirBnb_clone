from accounts.models import User
from accounts.serializers import UserSerializer
from rest_framework import serializers
from cloudinary.utils import cloudinary_url
from .models import (
    Category, 
    ListingImage,
    Location, 
    Property,
    Reservation, 
    Review
)

class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ListingImage
        fields = ['id', 'image_url']

    def get_image_url(self, obj):
        return cloudinary_url(obj.image.public_id, secure=True)[0]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'title', 'picture_url']

class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class PropertyDetailSerializer(serializers.ModelSerializer):
    host = UserSerializer()
    images = ImageSerializer(many=True)
    class Meta:
        model = Property
        fields = '__all__'
        depth = 1

class PropertyListSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    location = LocationSerializer()

    class Meta:
        model = Property
        fields = ['id', 'title', 'price', 'location', 'images', 'photo', 'host']
    
    def get_images(self, obj):
        images = obj.images.all()[:5]
        return ImageSerializer(images, many=True).data

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
