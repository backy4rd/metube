import User from './IUser';

export default interface Report {
  id: number;
  reason: string;
  isResolved: boolean;
  createdAt: Date;
  user: User;
}
