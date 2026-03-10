import { SessionStatus } from "@/games/entities/session.entity";

export class CreateSessionDto {
    game_id: number;
    host_id: number;
    location: string;
    date_time: Date;
    status: SessionStatus;
    notes: string;
}
