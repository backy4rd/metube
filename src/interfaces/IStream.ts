import User from './IUser';

export function isStream(object: any): object is Stream {
  return 'isStreaming' in object;
}

export default interface Stream {
  id: string;
  name: string;
  streamKey: string;
  thumbnailPath: string | null;
  isStreaming: boolean;
  description: string | null;
  lastStreamedAt: Date | null;
  user: User;
}
