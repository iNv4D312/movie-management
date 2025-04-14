from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Movie model
class Movie(models.Model):
    title = models.CharField(max_length=255)
    genre = models.CharField(max_length=100, default="Unknown")  # Retained genre field
    description = models.TextField()
    video_file = models.FileField(upload_to='movies/')  # Updated field name **Required
    thumbnail = models.ImageField(upload_to='thumbnails/')  # Updated field name **Required
    created_at = models.DateTimeField(auto_now_add=True)  # Renamed from date_added

    def __str__(self):
        return self.title

# Custom user model
class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='profiles/', default='profiles/profile-icon.jpg')

    groups = models.ManyToManyField(
        Group,
        related_name="customuser_groups"  # Fixes group accessor conflict
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_permissions"  # Fixes permission accessor conflict
    )
