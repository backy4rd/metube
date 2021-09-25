export default interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  female: boolean;
  avatarPath: string;
  bannerPath: string;
  iconPath: string;
  joinedAt: Date;
  totalViews: number;
  totalSubscribers: number;
  role: string;
}
