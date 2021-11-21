import { CreateRoleDto } from "src/Role/dto/create-role.dto";
import { IShowRoleDto, ShowRoleDto } from "src/Role/dto/show-role.dto";
import { Role } from "src/Role/role.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { IShowUserDto, ShowUserDto } from "../dto/show-user.dto";
import { User } from "../user.entity";

const DEFAULT_IMAGE = "https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg";

export class ExpandRoleUser implements IShowRoleDto, IShowUserDto{
    roleId: string;
    userId: string;
    type: string;
    username: string;
    alias: string;
    email: string;
    puntuation: number;
    description: string;
    imageURL: string;
    creationDate: string;
    updateDate: string;
}

interface Builder<T, Q, K = null>{
    create(createDto: T, aux : K) : Q;
}

class UserBuilder implements Builder<CreateUserDto, User>{
    create(user: CreateUserDto) : User{
        const nUser = new User();
        nUser.username = user.username;
        nUser.alias = user.username;
        nUser.email = user.email;
        nUser.password = user.password;
        return nUser;
    }
}

class RoleBuilder implements Builder<CreateRoleDto, Role, User>{
    create(role: CreateRoleDto, user: User) : Role{
        const nRole = new Role();
        nRole.imageURL = role.imageURL || DEFAULT_IMAGE;
        nRole.description = role.description;
        nRole.type = role.type;
        nRole.puntuation = 0;
        nRole.userId = user.id;
        nRole.creationDate = new Date().toDateString();
        nRole.updateDate = new Date().toDateString();
        return nRole;
    }
}

export class EntityBuilder{
    private static roleBuilder: RoleBuilder = new RoleBuilder;
    private static userBuilder: UserBuilder = new UserBuilder;

    static buildRole(role: CreateRoleDto, user: User){
        return this.roleBuilder.create(role, user);
    }

    static buildUser(user: CreateUserDto){
        return this.userBuilder.create(user);
    }
}

export class ClientShowDataBuilder{

    public static constructShowRoleDto(role: Role) : ShowRoleDto{
        const nShowRoleDto = new ShowRoleDto();
        nShowRoleDto.roleId = role.id;
        nShowRoleDto.description = role.description;
        nShowRoleDto.creationDate = role.creationDate;
        nShowRoleDto.imageURL = role.imageURL || DEFAULT_IMAGE;
        nShowRoleDto.puntuation = role.puntuation;
        nShowRoleDto.updateDate = role.updateDate;
        nShowRoleDto.type = role.type;
        return nShowRoleDto;
    }

    public static constructShowUserDto(user: User) : ShowUserDto{
        const nShowUserDto = new ShowUserDto();
        nShowUserDto.alias = user.alias;
        nShowUserDto.email = user.email;
        nShowUserDto.userId = user.id;
        nShowUserDto.username = user.username;
        return nShowUserDto;
    }

    public static constructExpandRoleUser(user: User, role: Role) :  ExpandRoleUser{
        const nExpandRoleUser = new ExpandRoleUser();

        nExpandRoleUser.userId = user.id;
        nExpandRoleUser.username = user.username;
        nExpandRoleUser.email = user.email;
        nExpandRoleUser.alias = user.alias;

        nExpandRoleUser.type = role.type;
        nExpandRoleUser.description = role.description;
        nExpandRoleUser.imageURL = role.imageURL || DEFAULT_IMAGE;
        nExpandRoleUser.roleId = role.id;
        nExpandRoleUser.puntuation = 0;
        nExpandRoleUser.creationDate = new Date().toDateString();
        nExpandRoleUser.updateDate = new Date().toDateString();

        return nExpandRoleUser;
    }
}