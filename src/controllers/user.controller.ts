import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/entities/User/dto/create-user.dto';
import { LoginUserDto } from 'src/entities/User/dto/login-user.dto';
import { ShowUserDto } from 'src/entities/User/dto/show-user.dto';
import { UserFilters } from 'src/entities/User/filters/user.filter';
import { User } from 'src/entities/User/user.entity';
import { UserService } from 'src/entities/User/user.service';
import { ClientResponse } from 'src/utils/client-response.dto';
import { Entities } from 'src/utils/enum-entities';
import { EntityFilter, Filterable } from 'src/utils/filters/entity-filter';
import { StatusCodes } from 'src/utils/utils';

@Controller('user')
export class UserController implements Filterable<User>{
  constructor(
    private readonly userService: UserService
  ) {
    this.filter = new EntityFilter<User>(Entities.USER);
  }
  filter: EntityFilter<User>;

  @Get('/all' )
  async getUsers() : Promise<ClientResponse<ShowUserDto[]>> {
    const response = new ClientResponse<ShowUserDto[]>();

    const users = await this.userService.getUsers();
    
    response.data = users.map(function(user){
      return this.filter.filter(user, UserFilters.SHOW);
    },this);
    response.statusCode = StatusCodes.OK;

    return response;
  }

  @Get('/me/:userId')
  async findUser(@Param('userId') userId: String) : Promise<ClientResponse<ShowUserDto>>{
    const response = new ClientResponse<ShowUserDto>();

    const gUser = await this.userService.findUser(userId);

    response.statusCode = StatusCodes.OK;
    response.data = this.filter.filter(gUser, UserFilters.SHOW);

    return response;
  } 

  @Post('/register')
  async addUser(@Body() dtoUser: CreateUserDto) : Promise<ClientResponse<ShowUserDto>>{
    const response = new ClientResponse<ShowUserDto>();

    try{
      const nUser = await this.userService.addUser(dtoUser);

      response.statusCode = StatusCodes.OK;
      response.data = this.filter.filter(nUser, UserFilters.SHOW);
      return response;
    }
    catch(e: any){
      response.error = e.message; 
      response.statusCode = StatusCodes.OK;

      return response;
    }
    
  }

  @Post('/login')
  async getUser(@Body() dtoUser: LoginUserDto) : Promise<ClientResponse<ShowUserDto>>{
    const response = new ClientResponse<ShowUserDto>();

    try{
      const nUser = await this.userService.getUser(dtoUser);

      response.statusCode = StatusCodes.OK;
      response.data = this.filter.filter(nUser, UserFilters.SHOW);
      return response;
    }
    catch(e: any){
      response.error = e.message; 
      response.statusCode = StatusCodes.OK;

      return response;
    }
    
  }
  
}
