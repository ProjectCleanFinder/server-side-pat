import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Buildable, EntityBuilder } from "src/utils/builders/entity-builder";
import { Entities } from "src/utils/enum-entities";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";

@Injectable()
export class RoleService implements Buildable<Role>{

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ){
        this.builder = new EntityBuilder<Role>(Entities.ROLE);
    }
    builder: EntityBuilder<Role>;

    async createRole(role: CreateRoleDto) : Promise<Role>{

        const existRole = await this.roleRepository.findOne({
            where: {
                userId: role.userId
            }   
        })

        if(existRole) return null;

        const nRole = this.builder.build(role);

        const savedRole = await this.roleRepository.save(nRole);

        return savedRole;
    }

    async getRole(userId: String) : Promise<Role>{

        const gRole = await this.roleRepository.findOne({
            where: {
                userId
            }
        });

        if(!gRole) throw new Error('no se encontro el rol');

        return gRole;
    }

    async getRoles() : Promise<Role[]>{
        const gRoles = await this.roleRepository.find();

        if(!gRoles)throw new Error('no se encontraron roles');

        return gRoles;
    }
}