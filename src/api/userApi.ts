import client from './client';

import User from '../interfaces/IUser';
import Video from '../interfaces/IVideo';
import Playlist from '@interfaces/IPlaylist';

class UserApi {
  public getSubscriptionUsers(): Promise<User[]> {
    return client.get('/users/subscriptions', { params: { limit: 100 } });
  }

  public getSubscribers(): Promise<User[]> {
    return client.get('/users/subscribers');
  }

  public getUserProfile(username: string): Promise<User> {
    return client.get(`/users/${username}/profile`);
  }

  public getOwnVideos(): Promise<Video[]> {
    return client.get(`/users/videos`);
  }

  public getUserVideos(username: string): Promise<Video[]> {
    return client.get(`/users/${username}/videos`);
  }

  public getOwnPlaylists(): Promise<Playlist[]> {
    return client.get(`/users/playlists`);
  }
}

export default new UserApi();
