import { PassportLocalDocument } from 'mongoose';

export type Role = "agency" | "admin" | "merchandiser";

export interface IUser extends PassportLocalDocument {
    readonly fullName: string;
    readonly appToken: string;
    readonly username: string;
    readonly password: string;
    readonly company: string;
    readonly roles: Role[];
}