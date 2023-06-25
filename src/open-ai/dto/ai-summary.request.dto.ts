import { IsString, IsUUID } from 'class-validator';

export class AISummaryRequestDto {
    @IsUUID()
    migrationId: string;

    @IsString()
    tableName: string;
}