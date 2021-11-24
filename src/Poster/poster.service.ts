import { Injectable, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientResponse } from "src/utils/client-response.dto";
import { StatusCodes } from "src/utils/utils";
import { Repository, RepositoryNotTreeError } from "typeorm";
import { CreatePosterDto } from "./dto/create-poster.dto";
import { Poster } from "./poster.entity";

@Injectable()
export class PosterService {
    constructor(
        @InjectRepository(Poster)
        private readonly posterRepository: Repository<Poster>
    ){}

    async getAllPosters() : Promise<ClientResponse<Poster[]>>{
        const response = new ClientResponse<Poster[]>();

        const posters = await this.posterRepository.find();

        response.statusCode = StatusCodes.OK;
        response.data = posters;

        return response;
    }

    async getPosters(userCreatorId: string) : Promise<ClientResponse<Poster[]>>{
        const response = new ClientResponse<Poster[]>();
        console.log(userCreatorId);
        const posters = await this.posterRepository.find({
            where: {
                userCreatorId
            }
        });

        response.statusCode = StatusCodes.OK;
        response.data = posters;

        return response;
    }

    async addPoster(poster: CreatePosterDto) : Promise<ClientResponse<Poster>>{
        const response = new ClientResponse<Poster>();

        const nPoster = new Poster();

        nPoster.description = poster.description;
        nPoster.direction = poster.direction;
        nPoster.reference = poster.reference;
        nPoster.title = poster.title;
        nPoster.userCreatorId = poster.userCreatorId;

        nPoster.creationDate = new Date().toDateString();
        nPoster.updateDate = nPoster.creationDate;
        nPoster.outdated = false;
        nPoster.status = "en espera";
        nPoster.userInterestedId = undefined;

        const savedPoster = await this.posterRepository.save(nPoster);

        response.statusCode = StatusCodes.OK;
        response.data = savedPoster;

        return response;
    }
}