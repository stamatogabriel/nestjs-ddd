import { Inject, Injectable } from '@nestjs/common';
import { User } from './user';
import { IUserRepository } from './user.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class FindByToken {
  constructor(@UserRepo() private readonly userRespository: IUserRepository) {}

  public async findByToken(token: string): Promise<User> {
    return await this.userRespository.FindByToken(token);
  }
}
