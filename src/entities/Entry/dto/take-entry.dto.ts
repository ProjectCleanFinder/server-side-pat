export interface ITakeEntryDto{
    entryId: string,
    userInterestedId: string,
}

export class TakeEntryDto implements ITakeEntryDto {
    entryId: string;
    userInterestedId: string;
}