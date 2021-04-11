import { Provider } from '@nestjs/common';
import { UserRepository } from '../../persistence/user/user.repository';

export const UserRepoProvider: Provider = {
  provide: 'UserRepo',
  useClass: UserRepository,
};
