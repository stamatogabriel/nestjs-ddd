import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ForgotPass {
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;
}