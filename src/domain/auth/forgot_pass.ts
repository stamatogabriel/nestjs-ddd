import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.repository';

const AuthRepo = () => Inject('AuthRepo');

@Injectable()
export class ForgotPass {
  constructor(@AuthRepo() private readonly authRespository: IAuthRepository) {}

  public async forgot(email: string): Promise<unknown> {
    return this.authRespository.ForgotPass(email);
  }
}
