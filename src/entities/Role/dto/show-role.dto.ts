export interface IShowRoleDto{
    roleId:       string;
    puntuation: number;
    description: string;
    imageURL:    string;
    creationDate: string;
    updateDate: string;
    type: string;
}

export class ShowRoleDto implements IShowRoleDto{
    roleId: string;
    type: string;
    puntuation: number;
    description: string;
    imageURL:    string;
    creationDate: string;
    updateDate: string;
}