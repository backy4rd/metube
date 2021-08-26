import User from './IUser';

export default interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  totalReplies: number;
  like: number;
  dislike: number;
  react: boolean | null;
}
