import { Controller, Get, Param } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionservice: SessionService) {}
                
        @Get()
        findAll() {
            return this.sessionservice.findAll();
             }
                
            @Get(':id')
            findById(@Param('id') id: string) {
                  return this.sessionservice.findById(+id);
             }
}
