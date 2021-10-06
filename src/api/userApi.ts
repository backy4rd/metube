import client from './client';

import User from '../interfaces/IUser';
import Video from '../interfaces/IVideo';
import Playlist from '@interfaces/IPlaylist';
import Stream from '@interfaces/IStream';
import Range from '../interfaces/IRange';

interface UpdateStreamFields {
  name: string;
  thumbnail: File;
  renew_key: '0' | '1';
}

class UserApi {
  public getUserProfile(username: string): Promise<User> {
    return client.get(`/users/${username}/profile`);
  }

  public getUserStream(username: string): Promise<Stream> {
    return client.get(`/users/${username}/stream`);
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

  public getUserPlaylists(username: string, range?: Range): Promise<Playlist[]> {
    return client.get(`/users/${username}/playlists`, { params: { ...range } });
  }

  public updateStream(data: Partial<UpdateStreamFields>): Promise<Stream> {
    return client.patch(`/stream/me`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export default new UserApi();
