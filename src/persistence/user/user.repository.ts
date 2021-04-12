import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user';
import { IUserEntity } from './user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly user: Model<IUserEntity>) {}

  public async Create(data: User): Promise<User> {
    return await this.user.create(data);
  }

  public async Index(): Promise<User[]> {
    return await this.user.find();
  }

  public async FindById(id: string): Promise<User> {
    return await this.user.findById(id);
  }

  public async UpdateById(id: string, data: Partial<User>): Promise<User> {
    return await (
      await this.user.findByIdAndUpdate(id, data, { new: true })
    ).save();
  }

  public async Destroy(id: string): Promise<unknown> {
    await this.user.findByIdAndDelete(id);

    return { message: 'User successfully deleted.' };
  }
}
