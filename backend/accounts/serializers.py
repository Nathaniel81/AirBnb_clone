from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """

    picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'picture']

    def get__id(self, obj):
        """
        Get the id field value.
        """

        return obj.id

    def get_picture(self, obj):
        """
        Get the user's picture URL.
        """

        return obj.picture.url if hasattr(obj.picture, 'url') else obj.picture
