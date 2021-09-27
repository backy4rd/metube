import client from './client';

import User from '../interfaces/IUser';
import Video from '../interfaces/IVideo';
import Playlist from '@interfaces/IPlaylist';
import Range from '../interfaces/IRange';

class UserApi {
  public getOwnProfile(): Promise<User> {
    return client.get(`/users/profile`);
  }

  public getOwnSubscription(range?: Range): Promise<User[]> {
    return client.get('/users/subscriptions', { params: { ...range } });
  }

  public getOwnSubscribers(range?: Range): Promise<User[]> {
    return client.get('/users/subscribers', { params: { ...range } });
  }

  public getOwnVideos(range?: Range): Promise<Video[]> {
    return client.get(`/users/videos`, { params: { ...range } });
  }

  public getOwnPlaylists(range?: Range): Promise<Playlist[]> {
    return client.get(`/users/playlists`, { params: { ...range } });
  }

  public getUserProfile(username: string): Promise<User> {
    return client.get(`/users/${username}/profile`);
  }

  public getUserSubscription(username: string, range?: Range): Promise<User[]> {
    return client.get(`/users/${username}/subscriptions`, { params: { ...range } });
  }

  public getUserSubscribers(username: string, range?: Range): Promise<User[]> {
    return client.get(`/users/${username}/subscribers`, { params: { ...range } });
  }

  public getUserVideos(username: string, range?: Range): Promise<Video[]> {
    return client.get(`/users/${username}/videos`, { params: { ...range } });
  }
}

export default new UserApi();
