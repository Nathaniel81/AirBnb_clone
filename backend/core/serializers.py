from rest_framework import serializers

from .models import Address, Category, Property, Review, Reservation
from accounts.serializers import UserSerializer
from accounts.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'title', 'picture_url']

class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

class PropertyDetailSerializer(serializers.ModelSerializer):
    host = UserSerializer()
    class Meta:
        model = Property
        fields = '__all__'
        depth = 1

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
