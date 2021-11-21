import { Role } from "../role.entity";
import { ShowRoleDto } from "./show-role.dto";

export class RoleDtoConverter {
    static toShowRole(_role: Role)  : ShowRoleDto{
        let srd =  new ShowRoleDto();
        srd.roleId = _role.id;
        srd.imageURL = _role.imageURL;
        srd.description = _role.description;
        srd.creationDate = _role.creationDate;
        srd.updateDate = _role.updateDate;
        srd.puntutation = _role.puntutation;
        return srd;
    }

    static toShowRoles(_roles: Role[]) : ShowRoleDto[]{
        return _roles.map((_role: Role) => this.toShowRole(_role));
    }
}