from rest_framework import viewsets
from .models import Playlist, Favorite, Track
from .serializers import PlaylistSerializer, TrackSerializer, FavoriteSerializer
from .forms import PlaylistFilter, FavoriteFilter
from django_filters.rest_framework import DjangoFilterBackend


class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    filter_class = FavoriteFilter

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    filter_class = PlaylistFilter

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
