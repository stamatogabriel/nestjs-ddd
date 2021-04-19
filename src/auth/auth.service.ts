import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { HmacSHA512 } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

import { FindByEmail } from '../domain/user/find_by_email';
import { FindByToken } from '../domain/user/find_by_token';
import { UpdateById } from '../domain/user/update_by_id';

import { User } from '../domain/user/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByEmail: FindByEmail,
    private readonly findUserByToken: FindByToken,
    private readonly updateUser: UpdateById,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail.findByEmail(email);
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

  async login(user: User) {
    user.password = undefined;

    return {
      user,
      accessToken: this.jwtService.sign(JSON.stringify(user)),
    };
  }

  async forgotPass(email: string) {
    const user = await this.findUserByEmail.findByEmail(email);

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const data = uuidv4();

    const hashData = HmacSHA512(data, process.env.PASSWORD_SALT).toString();

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await this.updateUser.updateById(user._id, {
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
  }

  async redefinePass(token: string, password: string) {
    const user: any = await this.findUserByToken.findByToken(token);

    if (!user) {
      throw new HttpException(
        { message: 'Usuário not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (new Date() > user.passwordResetExpires) {
      throw new HttpException(
        { message: 'Token expirou. Por favor, repita o processo novamente.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.updateUser.updateById(user._id, {
      password: password,
      passwordResetExpires: null,
      passwordResetToken: null,
    });
  }
}
