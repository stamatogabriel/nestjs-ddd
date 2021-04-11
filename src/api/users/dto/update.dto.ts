import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create.dto';

export class UpdateUserDto extends PartialType(CreateUserDTO) {}
