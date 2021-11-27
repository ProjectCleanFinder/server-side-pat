export interface IShowUserDto{
    userId:   string;
    username: string;
    alias:    string;
    email:    string;
}

export class ShowUserDto implements IShowUserDto{
    userId:   string;
    username: string;
    alias:    string;
    email:    string;
}