from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PropertyViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
