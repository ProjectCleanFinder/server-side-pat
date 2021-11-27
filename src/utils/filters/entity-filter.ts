import { EntryFilter } from "src/entities/Entry/filters/entry.filter";
import { RoleFilter } from "src/entities/Role/filters/role.filter";
import { UserFilter } from "src/entities/User/filters/user.filter";
import { Entities } from "../enum-entities";

export interface Filterable <T>{
    filter: EntityFilter<T>;
}

export class EntityFilter <T>{
    private eFilter;
    constructor(
        private type: Entities
    ){
        switch(this.type){
            case Entities.USER: {
                this.eFilter = new UserFilter();
                break;
            }
            case Entities.ROLE: {
                this.eFilter = new RoleFilter();
                break;
            }
            case Entities.ENTRY: {
                this.eFilter = new EntryFilter();
                break;
            }
            default: break;
        }
    }
    
    filter(ent: T, aux = null){
        return this.eFilter.filter(ent, aux);
    }
}