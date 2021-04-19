import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true })
  public readonly email: string | undefined;

  @IsString()
  @ApiProperty({ required: true })
  public readonly password: string | undefined;
}
