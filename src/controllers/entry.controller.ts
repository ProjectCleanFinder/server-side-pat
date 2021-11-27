import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateEntryDto } from "src/entities/Entry/dto/create-entry.dto";
import { ShowEntryDto } from "src/entities/Entry/dto/show-entry.dto";
import { Entry } from "src/entities/Entry/entry.entity";
import { EntryrService } from "src/entities/Entry/entry.service";
import { EntryFilters } from "src/entities/Entry/filters/entry.filter";
import { ClientResponse } from "src/utils/client-response.dto";
import { Entities } from "src/utils/enum-entities";
import { EntityFilter, Filterable } from "src/utils/filters/entity-filter";
import { StatusCodes } from "src/utils/utils";

@Controller('entry')
export class EntryController implements Filterable<Entry>{
    filter: EntityFilter<Entry>;
    constructor(
        private readonly entryService: EntryrService
    ) {
        this.filter = new EntityFilter<Entry>(Entities.ENTRY);
    }

    @Get('/all')
    async getAllEntries() : Promise<ClientResponse<ShowEntryDto[]>> {
        const response = new ClientResponse<ShowEntryDto[]>();

        const entries = await this.entryService.getAllEntries();
        
        response.data = entries.map(function(entry){
            return this.filter.filter(entry, EntryFilters.SHOW);
        },this);
        response.statusCode = StatusCodes.OK;

        return response;
    }

    @Get('/me/:userId')
    async getMyEntries(@Param('userId') userId: String) : Promise<ClientResponse<ShowEntryDto[]>>{
        const response = new ClientResponse<ShowEntryDto[]>();

        const entries = await this.entryService.getMyEntries(userId);
        
        response.data = entries.map(function(entry){
            return this.filter.filter(entry, EntryFilters.SHOW);
        },this);
        response.statusCode = StatusCodes.OK;

        return response;
    }

    @Post('/me/')
    async addEntry(@Body() createEntryDto: CreateEntryDto) : Promise<ClientResponse<ShowEntryDto>>{
        const response = new ClientResponse<ShowEntryDto>();

        const nEntry = await this.entryService.addEntry(createEntryDto);

        response.data = this.filter.filter(nEntry, EntryFilters.SHOW); 
        response.statusCode = StatusCodes.OK;

        return response;
    }
}