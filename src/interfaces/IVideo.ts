import Category from './ICategory';
import Report from './IReport';
import User from './IUser';

export interface IVideoAnalysis {
  views: Array<{ date: string; views: number }>;
  comments: Array<{ date: string; comments: number }>;
  videoReactions: Array<{ date: string; likes: number; dislikes: number }>;
}

export default interface Video {
  id: string;
  title: string;
  video360Path: string | null;
  video480Path: string | null;
  video720Path: string | null;
  video1080Path: string | null;
  thumbnailPath: string;
  duration: number;
  views: number;
  description: string | null;
  uploadedAt: Date; // date string
  watchedAt: Date; // date string
  reactedAt: Date; // date string
  addedAt: Date; // date string
  like: number;
  dislike: number;
  uploadedBy: User;
  react: boolean | null;
  totalComments: number;
  categories: Array<Category>;
  reports: Array<Report>;
  isBlocked: boolean;
  privacy: {
    id: number;
    name: 'public' | 'private';
  };
}
