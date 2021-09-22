import IComment from '@interfaces/IComment';
import IUser from '@interfaces/IUser';

export default function fulfillNewComment(comment: IComment, user: IUser): IComment {
  comment.user.username = user!.username;
  comment.user.iconPath = user!.iconPath;
  comment.like = 0;
  comment.dislike = 0;
  comment.totalReplies = 0;

  return comment;
}
