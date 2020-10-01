import { ApiProperty } from '@nestjs/swagger';

export class DeleteUsersDto {
    @ApiProperty()
    readonly deleteIds: string[];
}