import { Inject, Injectable } from '@nestjs/common';
import { User } from './user';
import { IUserRepository } from './user.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class FindById {
  constructor(@UserRepo() private readonly userRespository: IUserRepository) {}

  public async findById(id: string): Promise<User> {
    return await this.userRespository.FindById(id);
  }
}
