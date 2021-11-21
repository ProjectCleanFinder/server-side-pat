import { ICreateRoleDto } from "src/Role/dto/create-role.dto";

export interface ICreateUserDto{
    username: string;
    password: string;
    email:    string;
}

export class CreateUserDto implements ICreateUserDto, ICreateRoleDto{
    description: string;
    imageURL: string;
    type: string;
    username: string;
    password: string;
    email: string;
}