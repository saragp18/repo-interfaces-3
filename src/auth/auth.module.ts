import { Module } from '@nestjs/common';

import { UserModule } from './user/users.module';
import { RoleModule } from './role/role.module';

@Module({
    imports: [UserModule, RoleModule],
})
export class AuthModule {}
