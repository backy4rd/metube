import client from './client';
import ApiMessage from '../interfaces/IApiMessage';

class SubscriptionApi {
  public subscribe(username: string): Promise<ApiMessage> {
    return client.post(`/subscriptions/${username}`);
  }

  public unsubscribe(username: string): Promise<ApiMessage> {
    return client.delete(`/subscriptions/${username}`);
  }
}

export default new SubscriptionApi();
