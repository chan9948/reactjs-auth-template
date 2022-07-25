import { SigninDto } from '../dtos/auth/signin.dto';
import { IdType } from './common.type';
import { User } from './user.type';

export type AuthContextType = {
  user: User | null;
  checkIsLogin: () => boolean;
  login: (dto: SigninDto) => Promise<boolean>;
  logout: () => void;
};
