import { Builder } from "src/utils/builders/builder-interface";
import { ICreateRoleDto } from "../dto/create-role.dto";
import { Role } from "../role.entity";

export class RoleBuilder implements Builder<ICreateRoleDto, Role>{
    build(createDto: ICreateRoleDto): Role {
        const nRole = new Role();

        nRole.description = createDto.description;
        nRole.imageURL = createDto.imageURL;
        nRole.type = createDto.type;
        nRole.userId = createDto.userId;

        nRole.creationDate = new Date().toDateString();
        nRole.updateDate = new Date().toDateString();
        nRole.puntuation = 0;
        
        return nRole;
    }
}