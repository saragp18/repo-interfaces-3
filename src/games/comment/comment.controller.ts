import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentservice: CommentService) {}
        
            @Get()
            findAll() {
                return this.commentservice.findAll();
            }
        
            @Get(':id')
            findById(@Param('id') id: string) {
                return this.commentservice.findById(+id);
            }
}
