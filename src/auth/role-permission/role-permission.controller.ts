import { Controller, Get, Param } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';

@Controller('role-permission')
export class RolePermissionController {
    constructor(private readonly rolepermissionservice: RolePermissionService) {}
    
        @Get()
        findAll() {
            return this.rolepermissionservice.findAll();
        }
    
        @Get(':id')
        findById(@Param('id') id: string) {
            return this.rolepermissionservice.findById(+id);
        }
}
