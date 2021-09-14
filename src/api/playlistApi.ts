import client from './client';

import Video from '@interfaces/IVideo';

class PlaylistApi {
  public getPlaylistVideos(id: string): Promise<Video[]> {
    return client.get(`/playlists/${id}/videos`);
  }
}

export default new PlaylistApi();
