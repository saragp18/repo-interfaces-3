import { Module } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [PermissionService]
})
export class PermissionModule {}
