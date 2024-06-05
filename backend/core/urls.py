from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PropertyViewSet, CategoryViewSet, ReservationViewsets

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'reservations', ReservationViewsets, basename='reservation')

urlpatterns = [
    path('', include(router.urls)),
]
