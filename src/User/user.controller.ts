import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() 
  async getUser(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body()user: CreateUserDto){
    return await this.userService.addUser(user);
  }
}
