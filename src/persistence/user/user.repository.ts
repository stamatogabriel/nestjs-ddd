import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user';
import { IUserEntity } from './user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly user: Model<IUserEntity>) {}

  public async Create(data: User): Promise<User> {
    try {
      return await this.user.create(data);
    } catch (error) {
      throw new HttpException(
        {
          message: `could not create user: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async Index(): Promise<User[]> {
    try {
      return await this.user.find();
    } catch (error) {
      throw new HttpException(
        {
          message: `could not list users: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async FindById(id: string): Promise<User> {
    try {
      return await this.user.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          message: `could not find user: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async FindByEmail(email: string): Promise<User> {
    try {
      return await this.user.findOne({ email }).select('+password');
    } catch (error) {
      throw new HttpException(
        {
          message: `could not find user: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async FindByToken(token: string): Promise<User> {
    try {
      return await this.user
        .findOne({ passwordResetToken: token })
        .select(['+password', '+passwordResetToken', '+passwordResetExpires']);
    } catch (error) {
      throw new HttpException(
        {
          message: `could not find user: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async UpdateById(id: string, data: Partial<User>): Promise<User> {
    try {
      return await (
        await this.user
          .findByIdAndUpdate(id, data, { new: true })
          .select('+password')
      ).save();
    } catch (error) {
      throw new HttpException(
        {
          message: `could not update user: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async Destroy(id: string): Promise<unknown> {
    try {
      await this.user.findByIdAndDelete(id);
      return { message: 'User successfully deleted.' };
    } catch (error) {
      throw new HttpException(
        {
          message: `could not delete user: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
