import { Controller, Get, Param } from '@nestjs/common';
import { ParticipantService } from './participant.service';

@Controller('participant')
export class ParticipantController {
    constructor(private readonly participantservice: ParticipantService) {}
                
        @Get()
        findAll() {
            return this.participantservice.findAll();
             }
                
            @Get(':id')
            findById(@Param('id') id: string) {
                  return this.participantservice.findById(+id);
             }
}
