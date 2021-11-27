export interface ICreateUserDto{
    username: string;
    password: string;
    email:    string;
}

export class CreateUserDto implements ICreateUserDto{
    username: string;
    password: string;
    email:    string;
}