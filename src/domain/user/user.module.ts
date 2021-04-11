import { Module } from '@nestjs/common';

import { Create } from './create';
import { Index } from './index';
import { FindById } from './find_by_id';
import { UpdateById } from './update_by_id';
import { Destroy } from './delete';
import { UserRepositoryModule } from '../../persistence/user/user_repository.module';

@Module({
  imports: [UserRepositoryModule],
  providers: [Index, Create, FindById, UpdateById, Destroy],
  exports: [Index, Create, FindById, UpdateById, Destroy],
})
export class UserModule {}
