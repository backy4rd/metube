import client from './client';

import User from '../interfaces/IUser';
import Video from '../interfaces/IVideo';
import Playlist from '@interfaces/IPlaylist';
import Stream from '@interfaces/IStream';
import Range from '../interfaces/IRange';
import ApiMessage from '@interfaces/IApiMessage';

interface UpdateStreamFields {
  name: string;
  thumbnail: File;
  description: string;
  renew_key: '0' | '1';
}

interface UpdateBannerAndNameFields {
  banner: File;
  first_name: string;
  last_name: string;
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

  public updateAvatar(avatar: File): Promise<ApiMessage> {
    return client.patch(
      `/users/me`,
      { avatar },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }

  public updateBannerAndName(data: Partial<UpdateBannerAndNameFields>): Promise<ApiMessage> {
    return client.patch(`/users/me`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  public updateStream(data: Partial<UpdateStreamFields>): Promise<Stream> {
    return client.patch(`/users/me/stream`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export default new UserApi();
