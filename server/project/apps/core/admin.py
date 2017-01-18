from django.contrib import admin
from .models import Playlist, Favorite, Track, FavoritesList

admin.site.register(Playlist)
admin.site.register(Favorite)
admin.site.register(Track)
admin.site.register(FavoritesList)
