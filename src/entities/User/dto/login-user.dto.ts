export interface ILoginUserDto{
    username: string;
    password: string;
}

export class LoginUserDto implements ILoginUserDto{
    username: string;
    password: string;
}