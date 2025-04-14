from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import json
from movies.models import Movie
from movies.serializers import MovieSerializer

@api_view(['GET', 'POST'])
def login_user(request):
    if request.method == 'GET':
        return JsonResponse({'message': 'Login page is accessible'})  # Debug response

    elif request.method == 'POST':
        try:
            data = request.data  # DRF automatically handles JSON parsing
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return JsonResponse({"error": "Both username and password are required"}, status=400)

            user = authenticate(username=username, password=password)

            if user:
                if user.is_active:
                    token, _ = Token.objects.get_or_create(user=user)
                    return JsonResponse({"token": token.key, "username": user.username}, status=200)
                return JsonResponse({"error": "User account is disabled"}, status=403)
            return JsonResponse({"error": "Invalid username or password"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

@api_view(['GET', 'POST'])
def register_user(request):
    if request.method == "GET":
        return JsonResponse({"message": "Registration page is accessible"})  # Debug response

    elif request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({"message": "User registered successfully"}, status=201)

@api_view(['GET'])
def get_movies(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    
    return JsonResponse({"movies": serializer.data}, safe=False)  # Ensures JSON formatting

@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_movie(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    data = request.data

    # Retain original data if not provided in the request
    movie.title = data.get('title', movie.title) or None
    movie.genre = data.get('genre', movie.genre) or None
    movie.description = data.get('description', movie.description) or None

    # Handle video file update
    if 'video_file' in request.FILES:
        if movie.video_file:
            movie.video_file.delete(save=False)  # Ensure old file gets deleted
        movie.video_file = request.FILES['video_file']
    elif 'video_file' not in data:
        movie.video_file = None  # Allow null video

    # Handle thumbnail update
    if 'thumbnail' in request.FILES:
        if movie.thumbnail:
            movie.thumbnail.delete(save=False)
        movie.thumbnail = request.FILES['thumbnail']
    elif 'thumbnail' not in data:
        movie.thumbnail = None  # Allow null thumbnail

    movie.save()  # Explicitly save changes
    
    return JsonResponse({"message": "Movie updated successfully!", "movie": MovieSerializer(movie).data})

@api_view(['DELETE'])
def delete_movie(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    movie.video_file.delete(save=False)  # Delete the video file if it exists
    movie.thumbnail.delete(save=False)  # Delete the thumbnail file if it exists
    movie.delete()
    
    return JsonResponse({"message": "Movie deleted successfully!"})

@api_view(['POST'])  # Ensure POST is allowed
@parser_classes([MultiPartParser, FormParser])  # Support file uploads
def upload_movie(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Method not allowed"}, status=405)

    data = request.data
    title = data.get('title')
    genre = data.get('genre')
    description = data.get('description')

    thumbnail = request.FILES.get('thumbnail')
    video_file = request.FILES.get('video_file')

    if not title or not genre or not description:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    movie = Movie.objects.create(
        title=title,
        genre=genre,
        description=description,
        thumbnail=thumbnail if thumbnail else None,
        video_file=video_file if video_file else None
    )

    return JsonResponse({"message": "Movie uploaded successfully!", "movie": MovieSerializer(movie).data})