import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUser } from '../../domain/auth/validate_user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUser: ValidateUser) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.validateUser.validate(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
