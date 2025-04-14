"""
URL configuration for notflix project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from notflix.views import login_user, register_user, update_movie, delete_movie, upload_movie  


urlpatterns = [
    path('admin/', admin.site.urls),  
    path('api/', include('movies.urls')),  # Includes the movies app URLs 
    path('api/login/', login_user, name='login'),  # Login URL 
    path('api/register/', register_user, name='register'), # Register URL
    path('api/movies/<int:movie_id>/update/', update_movie, name='edit-movie'), # Update URL
    path('api/movies/<int:movie_id>/delete/', delete_movie, name='delete-movie'), # Delete URL
   # path('api/movies/', upload_movie, name='upload-movie'), # Upload URL
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)