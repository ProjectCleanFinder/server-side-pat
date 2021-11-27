
export interface ICreateEntryDto{
    title: string;
    description: string;
    direction: string;
    reference: string;
    userCreatorId: string;
}

export class CreateEntryDto implements ICreateEntryDto{
    title: string;
    description: string;
    direction: string;
    reference: string;
    userCreatorId: string;
}