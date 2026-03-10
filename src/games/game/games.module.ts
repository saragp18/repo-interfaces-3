import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { Game } from '../entities/game.entity';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserModule } from '@/auth/user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), UserModule],
  providers: [GameService],
  controllers: [GameController],
  exports: [GameService],
})
export class GamesModule {}
