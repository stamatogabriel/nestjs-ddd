import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from './dto/create.dto';

import { Create } from '../../domain/user/create';
import { Index } from '../../domain/user/index';
import { FindById } from '../../domain/user/find_by_id';
import { UpdateById } from '../../domain/user/update_by_id';
import { Destroy } from '../../domain/user/delete';

import { UpdateUserDto } from './dto/update.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: Create, 
    private readonly indexUser: Index, 
    private readonly findByIdUser: FindById, 
    private readonly updateUser: UpdateById,
    private readonly destroyUser: Destroy
  ) {}

  @Post()
  public async create(@Body() user: CreateUserDTO) {
    return this.createUser.create(user);
  }

  @Get()
  public async index() {
    return this.indexUser.index()
  }

  @Get(':id')
  public async findById(@Param('id') param) {
    return this.findByIdUser.findById(param)
  }

  @Put(':id')
  public async update(@Param('id') param, @Body() user: UpdateUserDto) {
    return this.updateUser.updateById(param, user);
  }

  @Delete(':id')
  public async delete(@Param('id') param) {
    return this.destroyUser.destroy(param);
  }
}