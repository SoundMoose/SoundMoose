import django_filters

from .models import Playlist, Favorite


class PlaylistFilter(django_filters.FilterSet):

    class Meta:
        model = Playlist
        fields = ('user_id', )

class FavoriteFilter(django_filters.FilterSet):

    class Meta:
        model = Favorite
        fields = ('user_id', )
