
import { CommentService } from './comment.service'; 
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { UserModule } from '@/auth/user/users.module';
import { GamesModule } from '../game/games.module';
import { Comment } from '../entities/comment.entity'; 

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), UserModule, GamesModule],
    providers: [CommentService],
    controllers: [CommentController]
})
export class CommentModule {}