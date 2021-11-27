import { Builder } from "src/utils/builders/builder-interface";
import { ICreateUserDto } from "../dto/create-user.dto";
import { User } from "../user.entity";

export class UserBuilder implements Builder<ICreateUserDto, User>{
    build(createDto: ICreateUserDto): User {
        const nUser = new User();
        nUser.alias = createDto.username;
        nUser.email = createDto.email;
        nUser.password = createDto.password;
        nUser.username = createDto.username;
        return nUser;
    }
}