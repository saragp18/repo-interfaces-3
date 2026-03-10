import { Module } from '@nestjs/common';

import { UserModule } from './user/users.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';

@Module({
    imports: [UserModule, RoleModule, PermissionModule, RolePermissionModule],
})
export class AuthModule {}
