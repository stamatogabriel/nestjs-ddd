import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.repository';

const AuthRepo = () => Inject('AuthRepo');

@Injectable()
export class RedefinePass {
  constructor(@AuthRepo() private readonly authRespository: IAuthRepository) {}

  public async redefine(token: string, password: string): Promise<unknown> {
    return this.authRespository.RedefinePass(token, password);
  }
}
