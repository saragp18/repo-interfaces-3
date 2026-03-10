import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { UserModule } from '@/auth/user/users.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participant]), SessionModule, UserModule],
  providers: [ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}