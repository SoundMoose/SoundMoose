import { User } from './user.model';

export interface Comment {
  commentId: number;
  created: Date;
  trackId: number;
  timestamp: number;
  body: string;
  user: User;
}
