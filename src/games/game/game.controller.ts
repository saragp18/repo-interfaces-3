import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameservice: GameService) {}
            
    @Get()
    findAll() {
        return this.gameservice.findAll();
         }
            
        @Get(':id')
        findById(@Param('id') id: string) {
              return this.gameservice.findById(+id);
         }
}
