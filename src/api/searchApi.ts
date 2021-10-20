import client from './client';

import Video from '@interfaces/IVideo';
import Range from '@interfaces/IRange';
import User from '@interfaces/IUser';
import Playlist from '@interfaces/IPlaylist';

class SearchApi {
  public async searchVideos(
    data: { q: string; max_upload_date?: string },
    range?: Range
  ): Promise<Video[]> {
    return client.get('/search/videos', { params: { ...data, ...range } });
  }

  public async searchUsers(query: string, range?: Range): Promise<User[]> {
    return client.get('/search/users', { params: { q: query, ...range } });
  }

  public async searchPlaylists(query: string, range?: Range): Promise<Playlist[]> {
    return client.get('/search/playlists', { params: { q: query, ...range } });
  }
}

export default new SearchApi();
