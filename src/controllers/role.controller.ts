import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateRoleDto } from "src/entities/Role/dto/create-role.dto";
import { ShowRoleDto } from "src/entities/Role/dto/show-role.dto";
import { RoleFilters } from "src/entities/Role/filters/role.filter";
import { Role } from "src/entities/Role/role.entity";
import { RoleService } from "src/entities/Role/role.service";
import { ClientResponse } from "src/utils/client-response.dto";
import { Entities } from "src/utils/enum-entities";
import { EntityFilter, Filterable } from "src/utils/filters/entity-filter";
import { StatusCodes } from "src/utils/utils";

@Controller('roles')
export class RoleController implements Filterable<Role>{
  constructor(
    private readonly roleService: RoleService
  ) {
    this.filter = new EntityFilter<Role>(Entities.ROLE);
  }
  filter: EntityFilter<Role>;

  @Get()
  async getRoles() : Promise<ClientResponse<ShowRoleDto[]>>{
    const response = new ClientResponse<ShowRoleDto[]>();

    const roles = await this.roleService.getRoles();

    response.data = roles.map(function(role){
        return this.filter.filter(role, RoleFilters.SHOW);
    });
    response.statusCode = StatusCodes.OK;

    return response;
  }

  @Get('/:userId')
  async getRole(@Param('userId') userId: String) : Promise<ClientResponse<ShowRoleDto>>{
    const response = new ClientResponse<ShowRoleDto>();

    const nRole = await this.roleService.getRole(userId);

    response.data = this.filter.filter(nRole, RoleFilters.SHOW);
    response.statusCode = StatusCodes.OK;

    return response;
  }

  @Post()
  async addRole(@Body() dtoRole: CreateRoleDto) : Promise<ClientResponse<ShowRoleDto>>{
    const response = new ClientResponse<ShowRoleDto>();

    try{
      const nRole = await this.roleService.createRole(dtoRole);
    
      response.data = this.filter.filter(nRole, RoleFilters.SHOW);
      response.statusCode = StatusCodes.OK;

      return response;
    }catch(e: any){
      response.error = e.message; 
      response.statusCode = StatusCodes.OK;

      return response;
    }

  }


}