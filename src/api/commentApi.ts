import client from './client';

import Comment from '../interfaces/IComment';
import Range from '../interfaces/IRange';
import ApiMessage from '../interfaces/IApiMessage';

class CommentApi {
  public getComments(videoId: string, range?: Range): Promise<Comment[]> {
    return client.get(`/videos/${videoId}/comments/`, { params: range });
  }

  public reactComment(
    videoId: string,
    commentId: number,
    isLike: boolean,
  ): Promise<ApiMessage> {
    return client.post(`/videos/${videoId}/comments/${commentId}/reaction`, {
      reaction: isLike ? 'like' : 'dislike',
    });
  }

  public removeCommentReaction(
    videoId: string,
    commentId: number,
  ): Promise<ApiMessage> {
    return client.delete(`/videos/${videoId}/comments/${commentId}/reaction`);
  }

  public getCommentReplies(
    videoId: string,
    commentId: number,
    range?: Range,
  ): Promise<Comment[]> {
    return client.get(`/videos/${videoId}/comments/${commentId}`, {
      params: range,
    });
  }

  public postComment(videoId: string, content: string): Promise<Comment> {
    return client.post(`/videos/${videoId}/comments`, { content });
  }

  public removeComment(
    videoId: string,
    commentId: number,
  ): Promise<ApiMessage> {
    return client.delete(`/videos/${videoId}/comments/${commentId}`);
  }

  public replyComment(
    videoId: string,
    commentId: number,
    content: string,
  ): Promise<Comment> {
    return client.post(`/videos/${videoId}/comments/${commentId}`, { content });
  }

  public updateComment(
    videoId: string,
    commentId: number,
    content: string,
  ): Promise<ApiMessage> {
    return client.patch(`/videos/${videoId}/comments/${commentId}`, {
      content,
    });
  }
}
export default new CommentApi();
