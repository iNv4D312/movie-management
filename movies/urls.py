from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'movies', MovieViewSet)  # Registers 'movies/' endpoint

urlpatterns = [
    path('', include(router.urls)),  # Ensures API routes are included
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # Serves media files during development
# Note: In a production environment, you should configure your web server to serve media files.
