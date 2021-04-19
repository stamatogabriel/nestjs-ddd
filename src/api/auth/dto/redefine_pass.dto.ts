import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RedefinePassDTO {
  @IsString()
  @ApiProperty({ required: true })
  password: string;

  @IsString()
  @ApiProperty({ required: true })
  token: string;
}
