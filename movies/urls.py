from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet)  # Registers 'movies/' endpoint

urlpatterns = [
    path('', include(router.urls)),  # Ensures API routes are included
]