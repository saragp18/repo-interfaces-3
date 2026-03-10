
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { GamesModule } from '../game/games.module';
import { UserModule } from '@/auth/user/users.module';
import { Session } from '../entities/session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Session]), GamesModule, UserModule],
    providers: [SessionService],
    controllers: [SessionController],
    exports: [SessionService]
})
export class SessionModule {}