import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants/auth';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UserModule } from '../domain/user/user.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        //Mailtrap's user and password
        transport: {
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "eca53d965bb31b",
            pass: "5bf7e1a96d6bf3"
          },
        },
        template: {
          // dir: path.resolve(__dirname, '..', 'common', 'templates'),
          // adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
