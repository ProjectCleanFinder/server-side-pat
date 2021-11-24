import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosterController } from './poster.controller';
import { Poster } from './poster.entity';
import { PosterService } from './poster.service';

@Module({
    imports: [TypeOrmModule.forFeature([Poster])],
    providers: [PosterService],
    controllers: [PosterController]
})
export class PosterModule {}
