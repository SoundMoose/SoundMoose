from rest_framework import serializers
from .models import Playlist, Track, Favorite

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Playlist
        fields = ('playlist_name', 'user_id', 'tracks')

    def create(self, validated_data):
        tracks_data = validated_data.pop('tracks')
        playlist = Playlist.objects.create(**validated_data)

        for track_data in tracks_data:
            Track.objects.create(**track_data)
        return playlist 

    def update(self, instance, validated_data):
        tracks_data = validated_data.pop('tracks')
        instance.playlist_name = validated_data.get('playlist_name', instance.playlist_name)
        instance.save()
        Track.objects.filter(playlist=instance.id).delete()

        for track_data in tracks_data:
            Track.objects.create(**track_data)
        return Playlist.objects.get(pk=instance.id)
        

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite 
        fields = '__all__' 

