import { User } from "../user.entity";
import { ShowUserDto } from "./show-user.dto";

export class UserDtoConverter {
    static toShowUser(_user: User)  : ShowUserDto{
        let sud =  new ShowUserDto();
        return sud;
    }

    static toShowUsers(_users: User[]) : ShowUserDto[]{
        return _users.map((_usr: User) => this.toShowUser(_usr));
    }
}