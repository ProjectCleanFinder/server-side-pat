import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Buildable, EntityBuilder } from 'src/utils/builders/entity-builder';
import { Entities } from 'src/utils/enum-entities';

@Injectable()
export class UserService implements Buildable<User>{

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    
  ){
    this.builder = new EntityBuilder<User>(Entities.USER);
  }  
  builder: EntityBuilder<User>;
  
  async getUsers(): Promise<User[]>{
    const users = await this.userRepository.find();
    
    if(!users) throw new Error('no existen usuarios');

    return users;
  }

  async addUser(user: CreateUserDto) : Promise<User>{
    const existUser = await this.userRepository.findOne({
      where:{
        username: user.username
      }
    });

    if(existUser) throw new Error('ya existe el usuario');
    
    const nUser = this.builder.build(user);
    const savedUser = await this.userRepository.save(nUser);

    //proxy - delegate - !!facade

    return savedUser;
  }

  async findUser(id: String) : Promise<User>{
    const gUser = await this.userRepository.findByIds([id]);

    if(!gUser) throw new Error('error al devolver del repositorio');

    if(gUser.length == 0) throw new Error('no existen coincidencias');

    if(gUser.length > 1) throw new Error('existen varias coincidencias');

    return gUser[0];
  }

  async getUser(user: LoginUserDto) : Promise<User>{

    const gUser = await this.userRepository.findOne({
      where: {
        username: user.username,
        password: user.password
      }
    });

    if(!gUser) throw new Error('no existe el usuario');

    return gUser;
  }
}