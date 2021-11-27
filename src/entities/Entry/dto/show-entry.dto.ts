export interface IShowEntryDto{
    entryId: string;
    title: string;
    description: string;
    direction: string;
    reference: string;
    userCreatorId: string;
    userInterestedId: string;
    creationDate: string;
    updateDate: string;
    status: string;
    outdated: boolean;
}

export class ShowEntryDto implements IShowEntryDto{
    entryId: string;
    title: string;
    description: string;
    direction: string;
    reference: string;
    userCreatorId: string;
    userInterestedId: string;
    creationDate: string;
    updateDate: string;
    status: string;
    outdated: boolean;

}