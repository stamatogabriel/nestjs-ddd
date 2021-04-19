import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { UserModule } from '../../domain/user/user.module';
import { AuthRepoProvider } from './auth.provider';

import { JwtStrategy } from '../../auth/strategies/jwt.strategy';

import { jwtConstants } from '../../auth/constants/auth';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        //Mailtrap's user and password
        transport: {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'eca53d965bb31b',
            pass: '5bf7e1a96d6bf3',
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
    JwtStrategy,
  ],
  providers: [AuthRepoProvider, JwtStrategy],
  exports: [AuthRepoProvider],
})
export class AuthRepositoryModule {}
