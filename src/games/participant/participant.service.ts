import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Participant } from '../entities/participant.entity';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { SessionService } from '../session/session.service';
import { UserService } from '@/auth/user/user.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Injectable()
export class ParticipantService {
    constructor(
            @InjectRepository(Participant)
            private readonly participantRepository: Repository<Participant>,
            private readonly userService: UserService,
            private readonly sessionService: SessionService,
        ) {}
        findById(id: number) {
            return this.participantRepository.findOne({ where: { id } , relations: ['user', 'game'] });
        }
        findAll() {
            return this.participantRepository.find();
        }

        async update(id: number, updateParticipantDto: UpdateParticipantDto) {
                    await this.participantRepository.update(id, updateParticipantDto);
                    return this.participantRepository.findOneBy({ id });
                }
            
                async remove(id: number) {
                    const result = await this.participantRepository.delete(id);
                    if (result.affected) {
                        return { id };
                    }
                    return null;
                }

        async create (createParticipantDto: CreateParticipantDto) {
            const user = await this.userService.findById(createParticipantDto.user_id)
            if (!user) {
                throw new Error('User not found');
            }
            const session = await this.sessionService.findById(createParticipantDto.session_id)
            if (!session) {
                throw new Error('Session not found');
            }
            const newParticipant = this.participantRepository.create({
                ...createParticipantDto,
                user,
                session,
            });
            return this.participantRepository.save(newParticipant);
        }
}
