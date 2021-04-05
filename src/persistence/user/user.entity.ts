import { Schema, Document } from 'mongoose';
import { HmacSHA512 } from 'crypto-js';

import { User } from '../../domain/user/user';

export const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

UserSchema.pre<IUserEntity>('save', function (next) {
  if (this.password) {
    const hashPassword = HmacSHA512(
      this.password,
      process.env.PASSWORD_SALT,
    ).toString();

    this.password = hashPassword;
  }
  next();
})

export interface IUserEntity extends Omit<User, '_id'>, Document { }