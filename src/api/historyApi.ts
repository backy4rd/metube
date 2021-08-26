import client from './client';

import Video from '../interfaces/IVideo';
import Range from '../interfaces/IRange';
import ApiMessage from '../interfaces/IApiMessage';

class HistoryApi {
  public getWatchedVideos(range?: Range): Promise<Video[]> {
    return client.get(`/histories/`, { params: range });
  }

  public clearWatchHistory(): Promise<ApiMessage> {
    return client.delete('/histories/');
  }
}

export default new HistoryApi();
