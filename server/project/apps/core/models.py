from django.db import models

class Track(models.Model):
  order = models.IntegerField()
  track_id = models.CharField(max_length=50)
  title = models.CharField(max_length=250)
  artist = models.CharField(max_length=250)
  img_url = models.CharField(max_length=250)
  stream_url = models.CharField(max_length=250)
  duration = models.IntegerField()
  platform = models.CharField(max_length=50)

  class Meta:
    verbose_name = "Track / Playlist item"
    verbose_name_plural = "Tracks / Playlists items"

    def __unicode__(self):
      return '%s' % (self.title)

class Playlist(models.Model):
  playlist_name = models.CharField(max_length=250)
  user_id = models.CharField(max_length=250)
  tracks = models.ManyToManyField(Track)

  class Meta:
    unique_together = ('playlist_name', 'user_id',)
    verbose_name = "Playlist"
    verbose_name_plural = "Playlists"

    def __unicode__(self):
        return '%s' % (self.user_id)


class Favorite(models.Model):
  user_id = models.CharField(max_length=250)
  track_id = models.CharField(max_length=50)
  platform = models.CharField(max_length=50)

  class Meta:
    unique_together = ('user_id', 'track_id',)
    verbose_name = "Favorite"
    verbose_name_plural = "Favorites"

  def __unicode__(self):
    return '%s <3 %s' % (self.user_id, self.track_id)
