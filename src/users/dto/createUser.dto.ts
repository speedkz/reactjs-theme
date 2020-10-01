import { ApiProperty } from '@nestjs/swagger';

export type Role = "agency" | "admin" | "merchandiser";

export class CreateUserDto {
    @ApiProperty()
    readonly _id: string;

    @ApiProperty()
    readonly fullName: string;

    @ApiProperty()
    appToken: string;

    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly company: string;

    @ApiProperty()
    readonly roles: Role[];
}