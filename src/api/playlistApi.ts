import client from './client';

import Video from '@interfaces/IVideo';
import Playlist from '@interfaces/IPlaylist';
import ApiMessage from '@interfaces/IApiMessage';
import Range from '@interfaces/IRange';

class PlaylistApi {
  public createPlaylist(playlist: Partial<Playlist> & Pick<Playlist, 'name'>): Promise<Playlist> {
    return client.post(`/playlists`, playlist);
  }

  public getPlaylist(playlistId: number): Promise<Playlist> {
    return client.get(`/playlists/${playlistId}`);
  }

  public updatePlaylist(
    playlistId: number,
    data: Pick<Playlist, 'name'> & Pick<Playlist, 'description'>
  ): Promise<ApiMessage> {
    return client.patch(`/playlists/${playlistId}`, data);
  }

  public deletePlaylist(playlistId: number): Promise<ApiMessage> {
    return client.delete(`/playlists/${playlistId}`);
  }

  public getPlaylistVideos(playlistId: number, range?: Range): Promise<Video[]> {
    return client.get(`/playlists/${playlistId}/videos`, { params: { ...range } });
  }

  public addVideoToPlaylist(
    playlistId: number,
    videoId: string
  ): Promise<{ videoId: string; playlistId: number }> {
    return client.post(`/playlists/${playlistId}/videos`, { video_id: videoId });
  }

  public removeVideoFromPlaylist(playlistId: number, videoId: string): Promise<ApiMessage> {
    return client.delete(`/playlists/${playlistId}/videos`, { data: { video_id: videoId } });
  }
}

export default new PlaylistApi();
