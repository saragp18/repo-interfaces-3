import { PartialType } from '@nestjs/mapped-types';

import { CreateSessionDto } from './create-session.dto';

export class ReadSessionDto extends PartialType(CreateSessionDto) {}
