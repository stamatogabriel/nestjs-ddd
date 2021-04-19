import { Module } from '@nestjs/common';

import { ValidateUser } from './validate_user';
import { Login } from './login';
import { ForgotPass } from './forgot_pass';
import { RedefinePass } from './redefine_pass';
import { AuthRepositoryModule } from '../../persistence/auth/auth_repository.module';

@Module({
  imports: [AuthRepositoryModule],
  providers: [ValidateUser, Login, ForgotPass, RedefinePass],
  exports: [ValidateUser, Login, ForgotPass, RedefinePass],
})
export class AuthModule {}
