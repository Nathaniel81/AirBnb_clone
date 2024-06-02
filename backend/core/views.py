from rest_framework import viewsets, status
from .models import Property, Category
from .serializers import PropertySerializer, CategorySerializer
from rest_framework.response import Response

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def create(self, request):
        print(request.data)
        return Response({
          'error': 'The view isn\'t implemented yet'
            }, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
