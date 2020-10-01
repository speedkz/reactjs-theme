import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordUserDto {
    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly newPassword: string;
}


