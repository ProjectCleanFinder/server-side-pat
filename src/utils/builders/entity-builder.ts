import { EntryBuilder } from "src/entities/Entry/builders/entry.builder";
import { RoleBuilder } from "src/entities/Role/builders/role.builder";
import { UserBuilder } from "src/entities/User/builders/user.builder";
import { Entities } from "../enum-entities";

export interface Buildable <T>{
    builder: EntityBuilder<T>;
}

export class EntityBuilder <T>{
    private eBuilder;
    constructor(
        private type: Entities
    ){
        switch(this.type){
            case Entities.USER: {
                this.eBuilder = new UserBuilder();
                break;
            }
            case Entities.ROLE: {
                this.eBuilder = new RoleBuilder();
                break;
            }
            case Entities.ENTRY: {
                this.eBuilder = new EntryBuilder();
                break;
            }
            default: break;
        }
    }
    
    build(createDto, aux = null) : T{
        return this.eBuilder.build(createDto, aux);
    }
}