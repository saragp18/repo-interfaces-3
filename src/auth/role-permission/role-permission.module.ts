import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from '../entities/role-permission.entity';
import { PermissionModule } from '../permission/permission.module';
import { RolePermissionService } from './role-permission.service';
import { RoleModule } from '../role/role.module';
import { RolePermissionController } from './role-permission.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RolePermission]), PermissionModule, RoleModule],
    controllers: [RolePermissionController],
    providers: [RolePermissionService],
})
export class RolePermissionModule {}
