import client from './client';

import Stream from '@interfaces/IStream';
import Range from '@interfaces/IRange';

class UserApi {
  public getLiveStreams(range?: Range): Promise<Stream[]> {
    return client.get(`/streams`, { params: { ...range } });
  }

  public getStream(streamId: string): Promise<Stream> {
    return client.get(`/streams/${streamId}`);
  }
}

export default new UserApi();
