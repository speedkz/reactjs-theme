import { IUser } from './user.interface';

export interface IUsersService {
    findAll(): Promise<IUser[]>;
    findById(ID: string): Promise<IUser | null>;
    findOne(options: Record<string, unknown>): Promise<IUser | null>;
    create(user: IUser): Promise<IUser>;
    update(ID: string, newValue: IUser): Promise<IUser | null>;
    delete(ID: string): Promise<string>;
    deleteAll(deleteIds: string[]): Promise<string>
}