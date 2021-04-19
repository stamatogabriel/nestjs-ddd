import { Module } from '@nestjs/common';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UserModule } from '../domain/user/user.module';
import { AuthModule as AuthDomain } from '../domain/auth/auth.module';

@Module({
  imports: [UserModule, AuthDomain],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}
