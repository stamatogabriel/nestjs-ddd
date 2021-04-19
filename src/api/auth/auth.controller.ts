import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/guards/local.guard';

import { ForgotPass } from './dto/forgot_pass.dto';
import { RedefinePass } from './dto/redefine_pass.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('forgot_pass')
  async forgotPass(@Body() forgot: ForgotPass): Promise<void> {
    // TODO: acho que podemos retornar void aqui
    return this.authService.forgotPass(forgot.email);
  }

  @Post('reset_pass')
  async resetPass(@Body() redefine: RedefinePass) {
    return this.authService.redefinePass(redefine.token, redefine.password);
  }
}
