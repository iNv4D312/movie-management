# from django.shortcuts import render

# # Create your views here.
from rest_framework import viewsets
from .models import Movie
from .serializers import MovieSerializer
from rest_framework.parsers import MultiPartParser, FormParser


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    parser_classes = (MultiPartParser, FormParser)