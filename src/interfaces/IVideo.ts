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
  uploadedAt: Date; // date string
  watchedAt: Date; // date string
  addedAt: Date; // date string
  like: number;
  dislike: number;
  uploadedBy: User;
  react: boolean | null;
  totalComments: number;
  categories: Array<Category>;
  privacy: {
    id: number;
    name: string;
  };
}
