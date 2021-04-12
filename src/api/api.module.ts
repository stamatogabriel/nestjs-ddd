import { Module } from '@nestjs/common';

import { DomainModule } from '../domain/domain.module';

import { UserController } from './users/user.controller';

@Module({
  controllers: [UserController],
  imports: [DomainModule],
})
export class ApiModule {}
