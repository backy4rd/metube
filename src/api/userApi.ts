import client from './client';

import User from '../interfaces/IUser';
import Video from '../interfaces/IVideo';
import Playlist from '@interfaces/IPlaylist';
import Range from '../interfaces/IRange';

class UserApi {
  public getOwnSubscription(): Promise<User[]> {
    return client.get('/users/subscriptions', { params: { limit: 100 } });
  }

  public getOwnSubscribers(range?: Range): Promise<User[]> {
    return client.get('/users/subscribers', { params: { ...range } });
  }

  public getUserProfile(username: string): Promise<User> {
    return client.get(`/users/${username}/profile`);
  }

  public getOwnProfile(): Promise<User> {
    return client.get(`/users/profile`);
  }

  public getOwnVideos(range?: Range): Promise<Video[]> {
    return client.get(`/users/videos`, { params: { ...range } });
  }

  public getUserVideos(username: string, range?: Range): Promise<Video[]> {
    return client.get(`/users/${username}/videos`, { params: { ...range } });
  }

  public getOwnPlaylists(): Promise<Playlist[]> {
    return client.get(`/users/playlists`);
  }
}

export default new UserApi();
