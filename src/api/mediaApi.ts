import axios from 'axios';

class MediaApi {
  public postVideo(
    video: File,
    options?: {
      onUploadProgress?: (progressEvent: ProgressEvent) => void;
      onUploadComplete?: (res: { video: string }) => void;
      onUploadError?: (err: Error) => void;
    }
  ): () => void {
    const source = axios.CancelToken.source();
    const form = new FormData();
    form.append('video', video);

    axios
      .post(process.env.REACT_APP_STATIC_URL + '/videos', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: options?.onUploadProgress,
        cancelToken: source.token,
      })
      .then((res) => options?.onUploadComplete?.(res.data.data))
      .catch(options?.onUploadError);

    return () => source.cancel('Upload cancelled');
  }

  public postPhoto(photo: File): Promise<{ photo: string }> {
    const form = new FormData();
    form.append('photo', photo);

    return axios
      .post(process.env.REACT_APP_STATIC_URL + '/photos', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data.data);
  }
}

export default new MediaApi();
