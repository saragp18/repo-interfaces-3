import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class  PermissionService {
    constructor(
            @InjectRepository(Permission)
            private readonly PermissionRepository: Repository<Permission>,
        ) {}
        findById(id: number) {
            return this.PermissionRepository.findOne({ where: { id } , relations: ['user', 'game'] });
        }
        findAll() {
            return this.PermissionRepository.find();
        }

        async update(id: number, updatePermissionDto: UpdatePermissionDto) {
                    await this.PermissionRepository.update(id, updatePermissionDto);
                    return this.PermissionRepository.findOneBy({ id });
                }
            
                async remove(id: number) {
                    const result = await this.PermissionRepository.delete(id);
                    if (result.affected) {
                        return { id };
                    }
                    return null;
                }

        async create (createPermissionDto: CreatePermissionDto) {
            const newPermission = this.PermissionRepository.create({
                ...createPermissionDto,
            });
            return this.PermissionRepository.save(newPermission);
        }
}
