import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { ClientResponse } from '../utils/client-response.dto';
import { ShowUserDto } from './dto/show-user.dto';
import { ExpandRoleUser } from './builders/user-role.builder';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() 
  async getUsers(): Promise<ClientResponse<ShowUserDto[]>> {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  async getUser(@Param()id: String): Promise<ClientResponse<ExpandRoleUser>>{
    return await this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body()user: CreateUserDto): Promise<ClientResponse<ExpandRoleUser>>{
    return await this.userService.addUser(user);
  }
}
