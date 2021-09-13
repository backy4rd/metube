import axios from 'axios';
import client from './client';

import Video from '../interfaces/IVideo';
import Category from '../interfaces/ICategory';
import ApiMessage from '../interfaces/IApiMessage';
import Range from '../interfaces/IRange';

class VideoApi {
  public getVideos(range?: Range, category?: string): Promise<Video[]> {
    return client.get('/videos/', { params: { ...range, category, sort: 'hot' } });
  }

  public getSubscriptionVideos(range?: Range): Promise<Video[]> {
    return client.get('/videos/subscription', { params: range });
  }

  public getRelateVideos(id: string, range?: Range): Promise<Video[]> {
    return client.get(`/videos/${id}/relate`, { params: range });
  }

  public getLikedVideos(range?: Range): Promise<Video[]> {
    return client.get(`/videos/liked`, { params: range });
  }

  public getVideo(id: string): Promise<Video> {
    return client.get('/videos/' + id);
  }

  public reactVideo(id: string, isLike: boolean): Promise<ApiMessage> {
    return client.post(`/videos/${id}/reaction`, {
      reaction: isLike ? 'like' : 'dislike',
    });
  }

  public removeVideoReaction(id: string): Promise<ApiMessage> {
    return client.delete(`/videos/${id}/reaction`);
  }

  public postVideo(
    data: {
      video: File;
      title: string;
      description?: string;
      categories?: Category[];
      thumbnailTimestamp?: number;
    },
    options?: {
      onUploadProgress?: (progressEvent: ProgressEvent) => void;
      onUploadComplete?: (res: Video) => void;
      onUploadError?: (err: Error) => void;
    }
  ): () => void {
    const payload = {
      video: data.video,
      title: data.title,
      description: data.description,
      thumbnail_timestamp: data.thumbnailTimestamp,
      categories: data.categories
        ? data.categories.map((category) => category.category).join(',')
        : '',
    };
    const source = axios.CancelToken.source();

    client
      .post('/videos/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: options?.onUploadProgress,
        cancelToken: source.token,
      })
      .then(options?.onUploadComplete as any)
      .catch(options?.onUploadError);

    return () => source.cancel('Upload cancelled');
  }
}

export default new VideoApi();
