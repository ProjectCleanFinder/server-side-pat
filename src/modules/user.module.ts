import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "src/controllers/role.controller";
import { UserController } from "src/controllers/user.controller";
import { Role } from "src/entities/Role/role.entity";
import { RoleService } from "src/entities/Role/role.service";
import { User } from "../entities/User/user.entity";
import { UserService } from "../entities/User/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [UserService, RoleService],
    controllers: [UserController, RoleController]
})
export class UserModule{}