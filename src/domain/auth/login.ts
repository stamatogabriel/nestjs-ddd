import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user/user';
import { Auth } from './auth';
import { IAuthRepository } from './auth.repository';

const AuthRepo = () => Inject('AuthRepo');

@Injectable()
export class Login {
  constructor(@AuthRepo() private readonly authRespository: IAuthRepository) {}

  public async login(user: User): Promise<Auth> {
    return this.authRespository.Login(user);
  }
}
