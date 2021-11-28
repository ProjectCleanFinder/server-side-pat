import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateRoleDto } from "src/entities/Role/dto/create-role.dto";
import { ShowRoleDto } from "src/entities/Role/dto/show-role.dto";
import { RoleFilters } from "src/entities/Role/filters/role.filter";
import { Role } from "src/entities/Role/role.entity";
import { RoleService } from "src/entities/Role/role.service";
import { UserService } from "src/entities/User/user.service";
import { ClientResponse } from "src/utils/client-response.dto";
import { Entities } from "src/utils/enum-entities";
import { EntityFilter, Filterable } from "src/utils/filters/entity-filter";
import { StatusCodes } from "src/utils/utils";

@Controller('role')
export class RoleController implements Filterable<Role>{
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService
  ) {
    this.filter = new EntityFilter<Role>(Entities.ROLE);
  }
  filter: EntityFilter<Role>;

  @Get('/all')
  async getRoles() : Promise<ClientResponse<ShowRoleDto[]>>{
    const response = new ClientResponse<ShowRoleDto[]>();

    const roles = await this.roleService.getRoles();

    response.data = roles.map(function(role){
        return this.filter.filter(role, RoleFilters.SHOW);
    }, this);
    response.statusCode = StatusCodes.OK;

    return response;
  }

  @Get('/me/:userId')
  async getRole(@Param('userId') userId: String) : Promise<ClientResponse<ShowRoleDto>>{
    const response = new ClientResponse<ShowRoleDto>();

    const nRole = await this.roleService.getRole(userId);

    response.data = this.filter.filter(nRole, RoleFilters.SHOW);
    response.statusCode = StatusCodes.OK;

    return response;
  }

  @Post('/register')
  async addRole(@Body() dtoRole: CreateRoleDto) : Promise<ClientResponse<ShowRoleDto>>{
    const response = new ClientResponse<ShowRoleDto>();

    try{
      await this.userService.findUser(dtoRole.userId);
      console.log(dtoRole);
      const nRole = await this.roleService.createRole(dtoRole);
      console.log(nRole);

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