export interface IShowRoleDto{
    roleId:       string;
    puntutation: number;
    description: string;
    imageURL:    string;
    creationDate: string;
    updateDate: string;
    type: string;
}

export class ShowRoleDto implements IShowRoleDto{
    roleId: string;
    type: string;
    puntutation: number;
    description: string;
    imageURL:    string;
    creationDate: string;
    updateDate: string;
}