import Category from './ICategory';
import User from './IUser';

export default interface Video {
  id: string;
  title: string;
  videoPath: string;
  thumbnailPath: string;
  duration: number;
  views: number;
  description: string | null;
  uploadedAt: string; // date string
  watchedAt: string; // date string
  like: number;
  dislike: number;
  uploadedBy: User;
  react: boolean | null;
  totalComments: number;
  categories: Array<Category>;
}
