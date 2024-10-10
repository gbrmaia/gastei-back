import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create')
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.service.create(createUserDTO);
  }

  @Post('findUserByEmail')
    findUserByEmail(@Body('email') email: string) {
        return this.service.findUserByEmail(email);
    }

  @Get('findAll')
  findAll() {
    return this.service.findAll();
  }

  @Delete('deleteUserByEmail')
    deleteUserByEmail(@Body('email') email: string) {
        return this.service.deleteUserByEmail(email);
    }
}
