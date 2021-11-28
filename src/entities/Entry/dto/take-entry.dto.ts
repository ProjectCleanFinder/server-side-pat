export interface ITakeEntryDto{
    entryId: string,
    userInterestedId: string,
    price: Number
}

export class TakeEntryDto implements ITakeEntryDto {
    entryId: string;
    userInterestedId: string;
    price: Number;
}