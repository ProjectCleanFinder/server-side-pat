import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntryController } from "src/controllers/entry.controller";
import { UserController } from "src/controllers/user.controller";
import { Entry } from "src/entities/Entry/entry.entity";
import { EntryrService } from "src/entities/Entry/entry.service";
import { User } from "src/entities/User/user.entity";
import { UserService } from "src/entities/User/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([Entry, User])],
    providers: [UserService, EntryrService],
    controllers: [UserController, EntryController]
})
export class EntryModule{}