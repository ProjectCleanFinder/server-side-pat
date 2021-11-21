import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ClientResponse } from '../utils/client-response.dto';
import { StatusCodes } from '../utils/utils';
import { UserDtoConverter } from './dto/converter-user.dto';
import { ShowUserDto } from './dto/show-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientShowDataBuilder, EntityBuilder, ExpandRoleUser } from './builders/user-role.builder';
import { Role } from 'src/Role/role.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}  
  
  async getUsers(): Promise<ClientResponse<ExpandRoleUser[]>>{
    const response = new ClientResponse<ExpandRoleUser[]>();
    const users = await this.userRepository.find();
    
    if(!users){
      response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      response.error = "error al buscar en la base de datos";
      return response;
    }

    response.statusCode = StatusCodes.OK;
    response.data = await Promise.all(users.map(async (_usr: User):Promise<ExpandRoleUser>=>{
      const role = await this.roleRepository.findOne({
        where: {
          userId: _usr.id
        }
      });
      return ClientShowDataBuilder.constructExpandRoleUser(_usr, role);
    }));
    return response;
  }

  async addUser(user: CreateUserDto) : Promise<ClientResponse<ExpandRoleUser>>{
    const response = new ClientResponse<ExpandRoleUser>();

    const existUser = await this.userRepository.findOne({
      where:{
        username: user.username
      }
    });

    if(existUser){
      response.statusCode = StatusCodes.ALREADY_EXIST;
      response.error = "ya existe el usuario";
      return response;
    }
    
    const nUser = EntityBuilder.buildUser(user);
    const savedUser = await this.userRepository.save(nUser);

    const nRole = EntityBuilder.buildRole(user, savedUser);
    const savedRole = await this.roleRepository.save(nRole);

    const responseData = ClientShowDataBuilder.constructExpandRoleUser(savedUser, savedRole);

    response.statusCode = StatusCodes.OK;
    response.data = responseData;

    return response;
  }

  async getUser(id: String) : Promise<ClientResponse<ExpandRoleUser>>{
    const response = new ClientResponse<ExpandRoleUser>();
    const gUser = await this.userRepository.findByIds([id]);
    if(!gUser){
      response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      response.error = "error al pedir ala base de datos";
      return response;
    }

    if(gUser.length == 0){
      response.statusCode = StatusCodes.NOT_FOUND;
      response.error = "no se encontro el usuario";
      return response;
    }

    if(gUser.length > 1){
      response.statusCode = StatusCodes.MULTIPLE_CHOICES;
      response.error = "existe mas de un usuario con ese id";
      return response;
    }

    const gRole = await this.roleRepository.findOne({
      where: {
        userId: gUser[0].id
      }
    })

    response.statusCode = StatusCodes.OK;
    response.data = ClientShowDataBuilder.constructExpandRoleUser(gUser[0], gRole);
    return response;
  }
}