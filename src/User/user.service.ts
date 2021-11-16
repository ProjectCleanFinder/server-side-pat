import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}  
  
  async getUsers(): Promise<User[]>{
    return await this.userRepository.find();
  }

  async addUser(user: CreateUserDto){
    console.log(user);
    let existUser = await this.userRepository.findOne(user);

    if(!existUser){
      let nUser = new User();
      nUser.password = user.password;
      nUser.username = user.username;
      nUser.name = user.username;
      nUser.email = user.email;

      let response = await this.userRepository.save(nUser);
      return response;
    }else{
      return {
        error: "el usuario ya existe"
      };
    }
  }
}