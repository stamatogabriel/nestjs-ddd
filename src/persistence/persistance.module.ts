import { Module } from '@nestjs/common';

import { UserRepositoryModule } from './user/user_repository.module';

@Module({
  imports: [UserRepositoryModule],
  exports: [UserRepositoryModule],
})
export class PersistenceModule {}
