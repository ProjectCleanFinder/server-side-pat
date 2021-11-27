import { Builder } from "src/utils/builders/builder-interface";
import { ICreateEntryDto } from "../dto/create-entry.dto";
import { Entry } from "../entry.entity";

export class EntryBuilder implements Builder<ICreateEntryDto, Entry>{
    build(createDto: ICreateEntryDto): Entry {
        const nEntry = new Entry();

        nEntry.description = createDto.description;
        nEntry.direction = createDto.direction;
        nEntry.reference = createDto.reference;
        nEntry.title = createDto.title;
        nEntry.userCreatorId = createDto.userCreatorId;

        nEntry.creationDate = new Date().toDateString();
        nEntry.updateDate = nEntry.creationDate;
        nEntry.outdated = false;
        nEntry.status = "en espera";
        nEntry.userInterestedId = undefined;

        return nEntry;
    }
}