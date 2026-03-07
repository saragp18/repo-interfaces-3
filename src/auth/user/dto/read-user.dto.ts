import { CreateUserDto } from './create-user.dto';

export class readUserDto extends CreateUserDto {
    id: number;
    created_at: Date;
}
