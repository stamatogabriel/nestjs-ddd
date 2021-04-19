import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user/user';
import { IAuthRepository } from './auth.repository';

const AuthRepo = () => Inject('AuthRepo');

@Injectable()
export class ValidateUser {
  constructor(@AuthRepo() private readonly authRespository: IAuthRepository) {}

  public async validate(email: string, password: string): Promise<User> {
    return this.authRespository.ValidateUser(email, password);
  }
}
