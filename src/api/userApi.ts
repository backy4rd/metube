import client from './client';

import User from '../interfaces/IUser';
import Video from '../interfaces/IVideo';

class UserApi {
  public getSubscriptionUsers(): Promise<User[]> {
    return client.get('/users/subscriptions');
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
}

export default new UserApi();
