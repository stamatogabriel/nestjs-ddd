import { Module } from '@nestjs/common';

import { DomainModule } from '../domain/domain.module';
import { AuthModule } from '../auth/auth.module';

import { UserController } from './users/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  controllers: [AuthController, UserController],
  imports: [DomainModule, AuthModule],
})
export class ApiModule {}
