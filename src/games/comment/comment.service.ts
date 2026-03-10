import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserService } from '@/auth/user/user.service';
import { GameService } from '../game/game.service';

@Injectable()
export class CommentService {
    constructor(
            @InjectRepository(Comment)
            private readonly commentRepository: Repository<Comment>,
            private readonly userService: UserService,
            private readonly gameService: GameService
        ) {}
        findById(id: number) {
            return this.commentRepository.findOne({ where: { id } , relations: ['user', 'game'] });
        }
        findAll() {
            return this.commentRepository.find();
        }

        async update(id: number, content: string) {
                    await this.commentRepository.update(id, { content });
                    return this.commentRepository.findOneBy({ id });
                }
            
                async remove(id: number) {
                    const result = await this.commentRepository.delete(id);
                    if (result.affected) {
                        return { id };
                    }
                    return null;
                }

        async create (createcommentDto: CreateCommentDto) {
            const user = await this.userService.findById(createcommentDto.user_Id);
            if (!user) {
                throw new Error('User not found');
            }
            const game = await this.gameService.findById(createcommentDto.game_Id);
            if (!game) {
                throw new Error('Game not found');
            }

            const newComment = this.commentRepository.create({
                content: createcommentDto.content,
                user,
                game,
                createdAt: new Date(),
            });
            return this.commentRepository.save(newComment);
        }
}
