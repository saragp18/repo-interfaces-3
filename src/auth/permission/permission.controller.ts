import { Controller, Get, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionservice: PermissionService) {}
    
        @Get()
        findAll() {
            return this.permissionservice.findAll();
        }
    
        @Get(':id')
        findById(@Param('id') id: string) {
            return this.permissionservice.findById(+id);
        }
}
