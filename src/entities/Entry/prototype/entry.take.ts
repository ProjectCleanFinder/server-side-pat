import { TakeEntryDto } from "../dto/take-entry.dto";
import { Entry } from "../entry.entity";

export class EntryPrototype{
    static takeEntry(ent: Entry, takeEntryDto: TakeEntryDto): Entry{
        const nEntry: Entry = Object.prototype.constructor(ent);
        console.log(nEntry);
        nEntry.userInterestedId = takeEntryDto.userInterestedId;
        nEntry.status = "procesed";
        return nEntry;
    }
}