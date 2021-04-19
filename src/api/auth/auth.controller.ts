import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '../../auth/guards/local.guard';

import { Login } from '../../domain/auth/login';
import { ForgotPass } from '../../domain/auth/forgot_pass';
import { RedefinePass } from '../../domain/auth/redefine_pass';

import { ForgotPassDTO } from './dto/forgot_pass.dto';
import { RedefinePassDTO } from './dto/redefine_pass.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private forgotPassUser: ForgotPass,
    private loginUser: Login,
    private redefinePass: RedefinePass
  ) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.loginUser.login(req.user);
  }

  @Post('forgot_pass')
  async forgotPass(@Body() forgot: ForgotPassDTO): Promise<unknown> {
    return this.forgotPassUser.forgot(forgot.email);
  }

  @Post('reset_pass')
  async resetPass(@Body() redefine: RedefinePassDTO) {
    return this.redefinePass.redefine(redefine.token, redefine.password);
  }
}
