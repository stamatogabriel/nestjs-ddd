import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDTO } from './dto/create.dto';

import { Create } from '../../domain/user/create';
import { Index } from '../../domain/user/index';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: Create, private readonly indexUser: Index) {}

  @Get()
  public async index() {
    return this.indexUser.index()
  }

  @Post()
  public async create(@Body() user: CreateUserDTO) {
    return this.createUser.create(user);
  }
}