import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "src/controllers/role.controller";
import { Role } from "./role.entity";
import { RoleService } from "./role.service";

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RoleService],
    controllers: [RoleController]
})
export class RoleModule{}