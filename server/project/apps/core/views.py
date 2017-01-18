from rest_framework import viewsets
from .models import Playlist, Favorite, Track, FavoritesList
from .serializers import PlaylistSerializer, TrackSerializer, FavoriteSerializer, FavoritesListSerializer
from .forms import PlaylistFilter, FavoritesListFilter
from django_filters.rest_framework import DjangoFilterBackend


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    filter_class = PlaylistFilter

class FavoritesListViewSet(viewsets.ModelViewSet):
    queryset = FavoritesList.objects.all()
    serializer_class = FavoritesListSerializer
    filter_class = FavoritesListFilter
