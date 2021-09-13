import User from './IUser';

export default interface Playlist {
  id: number;
  name: string;
  description: string;
  totalVideos: number;
  createdAt: Date;
  createdBy: User;
}
