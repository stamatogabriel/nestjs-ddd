import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: true })
  public readonly name: string | undefined;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true })
  public readonly email: string | undefined;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: true })
  public readonly password: string | undefined;
}
