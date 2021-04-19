import { Provider } from '@nestjs/common';
import { AuthRepository } from '../../persistence/auth/auth.repository';

export const AuthRepoProvider: Provider = {
  provide: 'AuthRepo',
  useClass: AuthRepository,
};
