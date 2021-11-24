import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { ClientResponse } from '../utils/client-response.dto';
import { ShowUserDto } from './dto/show-user.dto';
import { ExpandRoleUser } from './builders/user-role.builder';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() 
  async getUsers(): Promise<ClientResponse<ShowUserDto[]>> {
    return await this.userService.getUsers();
  }

  @Get('/me/:id')
  async findUser(@Param()id: String): Promise<ClientResponse<ExpandRoleUser>>{
    return await this.userService.findUser(id);
  }

  @Post('/signin')
  async createUser(@Body()user: CreateUserDto): Promise<ClientResponse<ExpandRoleUser>>{
    return await this.userService.addUser(user);
  }

  @Post('/login')
  async getUser(@Body()user: LoginUserDto): Promise<ClientResponse<ExpandRoleUser>>{
    return await this.userService.getUser(user);
  }
}
