export interface ICreateRoleDto {
    description: string;
    imageURL:    string;
    type:        string;
}

export class CreateRoleDto implements ICreateRoleDto{
    type:        string;
    description: string;
    imageURL:    string;
}