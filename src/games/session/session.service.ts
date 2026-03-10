import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Session, SessionStatus } from '../entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';

import { UserService, } from '@/auth/user/user.service';
import { GameService } from '../game/game.service';


@Injectable()
export class SessionService {
    constructor(
            @InjectRepository(Session)
            private readonly SessionRepository: Repository<Session>,
            private readonly userService: UserService,
            private readonly gameService: GameService,
        ) {}
        findById(id: number) {
            return this.SessionRepository.findOne({ where: { id } , relations: ['user', 'game'] });
        }
        findAll() {
            return this.SessionRepository.find();
        }

        async update(id: number, Status: SessionStatus) {
                    await this.SessionRepository.update(id, { status: Status });
                    return this.SessionRepository.findOneBy({ id });
                }
            
                async remove(id: number) {
                    const result = await this.SessionRepository.delete(id);
                    if (result.affected) {
                        return { id };
                    }
                    return null;
                }
        
        async create (createSessionDto: CreateSessionDto){

            const host = await this.userService.findById(createSessionDto.host_id)
            if (!host) {
                throw new Error('Host not found');
            }
            const game = await this.gameService.findById(createSessionDto.game_id)
            if (!game) {
                throw new Error('Game not found');
            }   

            const newSession = this.SessionRepository.create({
                ...createSessionDto,
                host,
                game,
            });
            return this.SessionRepository.save(newSession);
        }

}
