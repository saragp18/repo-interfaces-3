import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { RolePermission } from '../entities/role-permission.entity';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { PermissionService } from '../permission/permission.service';
import { RoleService } from '../role/role.service';


@Injectable()
export class RolePermissionService {
    constructor(
            @InjectRepository(RolePermission)
            private readonly RolePermissionRepository: Repository<RolePermission>,
            private readonly roleService: RoleService,
            private readonly permissionService: PermissionService,
            
        ) {}
        findById(id: number) {
            return this.RolePermissionRepository.findOne({ where: { id } , relations: ['user', 'game'] });
        }
        findAll() {
            return this.RolePermissionRepository.find();
        }

        async update(id: number, Role: RolePermission ) {
                    await this.RolePermissionRepository.update(id, Role);
                    return this.RolePermissionRepository.findOneBy({ id });
                }
            
                async remove(id: number) {
                    const result = await this.RolePermissionRepository.delete(id);
                    if (result.affected) {
                        return { id };
                    }
                    return null;
                }

        async create (createRolePermission: CreateRolePermissionDto) {
            const role = await this.roleService.findById(+createRolePermission.role_id)
            if (!role) {
                throw new Error('Role not found');
            }
            const permission = await this.permissionService.findById(createRolePermission.permission_id)
            if (!permission) {
                throw new Error('Permission not found');
            }

            const newRolePermission = this.RolePermissionRepository.create({
                role,
                permission,
            });
            return this.RolePermissionRepository.save(newRolePermission);
        }

}