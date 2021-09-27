import client from './client';

import Video from '@interfaces/IVideo';
import Range from '@interfaces/IRange';

class SearchApi {
  public async searchVideos(query: string, range?: Range): Promise<Video[]> {
    return client.get('/search/videos', { params: { q: query, ...range } });
  }
}

export default new SearchApi();
