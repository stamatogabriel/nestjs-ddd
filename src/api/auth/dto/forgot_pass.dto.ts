import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ForgotPassDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;
}
