export interface IUserStatistic {
  totalSubscribers: number;
  totalSubscriptions: number;
  totalViews: number;
  totalVideos: number;
  totalComments: number;
  totalVideoLikes: number;
  totalVideoDislikes: number;
  totalCommentLikes: number;
  totalCommentDislikes: number;
}

export default interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  female: boolean;
  description: string | null;
  avatarPath: string;
  bannerPath: string;
  iconPath: string;
  joinedAt: Date;
  totalSubscribers: number;
}
