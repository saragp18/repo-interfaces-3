import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class  RoleService {
    constructor(
            @InjectRepository(Role)
            private readonly RoleRepository: Repository<Role>,
        ) {}
        findById(id: number) {
            return this.RoleRepository.findOne({ where: { id } , relations: ['user', 'game'] });
        }
        findAll() {
            return this.RoleRepository.find();
        }

        findByName(name: string) {
            return this.RoleRepository.findOneBy({ name });
        }

        async update(id: number, updateRoleDto: UpdateRoleDto) {
                    await this.RoleRepository.update(id, updateRoleDto);
                    return this.RoleRepository.findOneBy({ id });
                }
            
                async remove(id: number) {
                    const result = await this.RoleRepository.delete(id);
                    if (result.affected) {
                        return { id };
                    }
                    return null;
                }
            
        async create (name: string, description: string) {
            const newRole = this.RoleRepository.create({
                name,
                description,
            });
            return this.RoleRepository.save(newRole);
        }
    }
