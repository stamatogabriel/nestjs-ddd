import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { HmacSHA512 } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

import { FindByEmail } from '../../domain/user/find_by_email';
import { FindByToken } from '../../domain/user/find_by_token';
import { UpdateById } from '../../domain/user/update_by_id';

import { IAuthRepository } from '../../domain/auth/auth.repository';
import { User } from '../../domain/user/user';
import { Auth } from 'src/domain/auth/auth';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly findUserByEmail: FindByEmail,
    private readonly findUserByToken: FindByToken,
    private readonly updateUserById: UpdateById,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService
  ) {}

  public async ValidateUser(email: string, password: string): Promise<User> {
    const user: User = await this.findUserByEmail.findByEmail(email);

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND
      );
    }

    const hashPassword = HmacSHA512(
      password,
      process.env.PASSWORD_SALT
    ).toString();

    if (hashPassword !== user.password) {
      throw new HttpException(
        { message: 'Invalid password' },
        HttpStatus.UNAUTHORIZED
      );
    }

    return user;
  }

  public async Login(user: User): Promise<Auth> {
    user.password = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    return {
      user,
      access_token: this.jwtService.sign(JSON.stringify(user)),
    };
  }

  public async ForgotPass(email: string): Promise<unknown> {
    const user = await this.findUserByEmail.findByEmail(email);

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND
      );
    }

    const data = uuidv4();

    const hashData = HmacSHA512(data, process.env.PASSWORD_SALT).toString();

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await this.updateUserById.updateById(user._id, {
      passwordResetToken: hashData,
      passwordResetExpires: now,
    });

    await this.mailerService.sendMail({
      to: email,
      from: process.env.MAIL_FROM,
      subject: 'Recupere sua senha',
      template: 'forgot_pass',
      html: `<h1>Recupere sua senha </h1>
            <a href="https://questionnaireflow-frontend.vercel.app/resetsenha?token=${hashData}">Clique Aqui</a>
      `,
    });

    return new HttpException('', HttpStatus.OK);
  }

  public async RedefinePass(token: string, password: string): Promise<unknown> {
    const user: any = await this.findUserByToken.findByToken(token);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (new Date() > user.passwordResetExpires) {
      throw new HttpException(
        'Token expired. Please, try again.',
        HttpStatus.UNAUTHORIZED
      );
    }

    await this.updateUserById.updateById(user._id, {
      password: password,
      passwordResetExpires: null,
      passwordResetToken: null,
    });

    return { message: 'password successfully reset' };
  }
}
