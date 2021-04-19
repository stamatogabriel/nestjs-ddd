import { User } from '../user/user';

export type Auth = {
  user: User;
  access_token: string;
};
