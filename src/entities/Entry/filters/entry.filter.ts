import { Filter } from "src/utils/filters/filter-interface";
import { IShowEntryDto, ShowEntryDto } from "../dto/show-entry.dto";
import { Entry } from "../entry.entity";

export enum EntryFilters{
    SHOW
}

export class EntryFilter implements Filter<Entry>{

    static showFilter(ent: Entry) : ShowEntryDto{
        const fUser = new ShowEntryDto();

        fUser.creationDate = ent.creationDate;
        fUser.description = ent.description;
        fUser.direction = ent.direction;
        fUser.entryId = ent.id;
        fUser.outdated = ent.outdated;
        fUser.reference = ent.reference;
        fUser.status = ent.status;
        fUser.title = ent.title;
        fUser.updateDate = ent.updateDate;
        fUser.userCreatorId = ent.userCreatorId;
        fUser.userInterestedId = ent.userInterestedId;

        return fUser;
    }

    filter(ent: Entry, aux: EntryFilters): IShowEntryDto {
        
        switch(aux){
            case EntryFilters.SHOW: return EntryFilter.showFilter(ent);
        }

    }
}