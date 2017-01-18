import django_filters

from .models import Playlist, FavoritesList


class PlaylistFilter(django_filters.FilterSet):

    class Meta:
        model = Playlist
        fields = ('user_id', )

class FavoritesListFilter(django_filters.FilterSet):

    class Meta:
        model = FavoritesList
        fields = ('user_id', )
