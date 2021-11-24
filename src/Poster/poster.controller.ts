import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientResponse } from 'src/utils/client-response.dto';
import { CreatePosterDto } from './dto/create-poster.dto';
import { Poster } from './poster.entity';
import { PosterService } from './poster.service';

@Controller('/poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @Get()
  async getAllPosters(): Promise<ClientResponse<Poster[]>> {
    return await this.posterService.getAllPosters();
  }

  @Get('/me/:userCreatorId')
  async getPosters(@Param() userCreatorId: string): Promise<ClientResponse<Poster[]>> {
    return await this.posterService.getPosters(userCreatorId);
  }

  @Post()
  async addPoster(@Body() poster: CreatePosterDto) : Promise<ClientResponse<Poster>> {
    return await this.posterService.addPoster(poster);
  }
}
