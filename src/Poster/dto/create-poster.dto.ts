
export interface ICreatePosterDto{
    title: string;
    description: string;
    direction: string;
    reference: string;
    userCreatorId: string;
}

export class CreatePosterDto implements ICreatePosterDto{
    title: string;
    description: string;
    direction: string;
    reference: string;
    userCreatorId: string;
}