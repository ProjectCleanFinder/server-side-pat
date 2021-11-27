import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Buildable, EntityBuilder } from "src/utils/builders/entity-builder";
import { Entities } from "src/utils/enum-entities";
import { Repository } from "typeorm";
import { CreateEntryDto } from "./dto/create-entry.dto";
import { Entry } from "./entry.entity";

@Injectable()
export class EntryrService implements Buildable<Entry>{

    constructor(
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>
    ){
        this.builder = new EntityBuilder<Entry>(Entities.ENTRY);
    }
    builder: EntityBuilder<Entry>;

    async getAllEntries() : Promise<Entry[]>{

        const entries = await this.entryRepository.find();

        if(!entries) throw new Error('error de entrada ala base de datos');

        return entries;
    }

    async getMyEntries(userId: String) : Promise<Entry[]>{

        const entries = await this.entryRepository.find({
            where: {
                userCreatorId: userId
            }
        });

        if(!entries) throw new Error('error de entrada ala base de datos');

        return entries;
    }

    async getEntries(userCreatorId: String) : Promise<Entry[]>{

        const entries = await this.entryRepository.find({
            where: {
                userCreatorId
            }
        });

        if(!entries) throw new Error('error de entrada ala base de datos');

        return entries;
    }

    async addEntry(entry: CreateEntryDto) : Promise<Entry>{

        const nEntry = this.builder.build(entry);

        const savedEntry = await this.entryRepository.save(nEntry);

        if(!savedEntry) throw new Error('error de entrada ala base de datos');

        return savedEntry;
    }
}