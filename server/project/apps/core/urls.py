from django.conf.urls import url, include
from rest_framework import routers
from core.models import Playlist
from core.views import FavoriteViewSet, PlaylistViewSet, TrackViewSet

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Soundmoose API')


router = routers.DefaultRouter()
router.register(r'favorites', FavoriteViewSet)
router.register(r'playlists', PlaylistViewSet)

urlpatterns = [
    url(r'^$', schema_view)
]
urlpatterns += router.urls
