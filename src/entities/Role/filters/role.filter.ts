import { Filter } from "src/utils/filters/filter-interface";
import { IShowRoleDto, ShowRoleDto } from "../dto/show-role.dto";
import { Role } from "../role.entity";

export enum RoleFilters{
    SHOW
}

export class RoleFilter implements Filter<Role>{

    static showFilter(ent: Role) : ShowRoleDto{
        const fUser = new ShowRoleDto();

        fUser.creationDate = ent.creationDate;
        fUser.description = ent.description;
        fUser.imageURL = ent.imageURL;
        fUser.puntuation = ent.puntuation;
        fUser.roleId = ent.id;
        fUser.type = ent.type;
        fUser.updateDate = ent.updateDate;

        return fUser;
    }

    filter(ent: Role, aux: RoleFilters): IShowRoleDto {
        
        switch(aux){
            case RoleFilters.SHOW: return RoleFilter.showFilter(ent);
        }

    }
}