import { Module } from '@nestjs/common';

import { Create } from './create';
import { Index } from './index';
import { UserRepositoryModule } from '../../persistence/user/user_repository.module'

@Module({
  imports: [UserRepositoryModule],
  providers: [Index, Create],
  exports: [Index, Create],
})
export class UserModule {};