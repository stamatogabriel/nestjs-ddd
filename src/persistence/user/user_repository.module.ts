import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.entity';
import { UserRepoProvider } from './user_persistance.provider';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [UserRepoProvider],
  exports: [UserRepoProvider],
})
export class UserRepositoryModule {}