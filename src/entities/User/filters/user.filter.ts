import { Filter } from "src/utils/filters/filter-interface";
import { IShowUserDto, ShowUserDto } from "../dto/show-user.dto";
import { User } from "../user.entity";

export enum UserFilters{
    SHOW
}

export class UserFilter implements Filter<User>{

    static showFilter(ent: User) : ShowUserDto{
        const fUser = new ShowUserDto();

        fUser.alias = ent.alias;
        fUser.email = ent.email;
        fUser.userId = ent.id;
        fUser.username = ent.username;

        return fUser;
    }

    filter(ent: User, aux: UserFilters){
        
        switch(aux){
            case UserFilters.SHOW: return UserFilter.showFilter(ent);
        }

    }
}