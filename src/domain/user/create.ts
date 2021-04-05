import { Inject, Injectable } from '@nestjs/common';
import { User } from './user';
import { IUserRepository } from './user.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class Create {
  constructor(@UserRepo() private readonly userRespository: IUserRepository) {}

  public async create(user: User): Promise<User> {
    return await this.userRespository.Create(user);
  }
}
