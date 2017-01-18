from rest_framework import serializers
from .models import Playlist, Track, Favorite, FavoritesList

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Playlist
        fields = ('id', 'playlist_name', 'user_id', 'tracks')

    def create(self, validated_data):
        tracks_data = validated_data.pop('tracks')
        playlist = Playlist.objects.create(**validated_data)

        for track_data in tracks_data:
            track_id = Track.objects.create(**track_data)
            playlist.tracks.add(track_id)

        return playlist 

    def update(self, instance, validated_data):
        tracks_data = validated_data.pop('tracks')
        instance.playlist_name = validated_data.get('playlist_name', instance.playlist_name)
        instance.save()
        Track.objects.filter(playlist=instance.id).delete()

        for track_data in tracks_data:
            track_id = Track.objects.create(**track_data)
            instance.tracks.add(track_id)

        instance.save()
        return Playlist.objects.get(pk=instance.id)
        

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite 
        fields = '__all__' 

class FavoritesListSerializer(serializers.ModelSerializer):
    favorites = FavoriteSerializer(many = True)

    class Meta:
        model = FavoritesList
        fields = ('user_id', 'favorites')

    def create(self, validated_data):
          favorites_data = validated_data.pop('favorites')
          favorites_list = FavoritesList.objects.create(**validated_data)

          for favorite_data in favorites_data:
              favorite_id = Favorite.objects.create(**favorite_data)
              favorites_list.favorites.add(favorite_id)
              
          favorites_list.save()
          return favorites_list 

    def update(self, instance, validated_data):
           favorites_data = validated_data.pop('favorites')
           Favorite.objects.filter(favoriteslist=instance.user_id).delete()

           for favorite_data in favorites_data:
               favorite_id = Favorite.objects.create(**favorite_data)
               instance.favorites.add(favorite_id)

           instance.save()
           return FavoritesList.objects.get(pk=instance.user_id) 
