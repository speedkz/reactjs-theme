import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { IUsersService } from './interfaces/iusers.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService implements IUsersService {
    constructor(@InjectModel('User') private readonly userModel: PaginateModel<IUser>) { }
    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }
    async paginate(filters, page: number, limit: number): Promise<any> {
        const options = {
            populate: [],
            page: Number(page),
            limit: Number(limit)
        }
        return await this.userModel.paginate(filters, options);
    }
    async findOne(options: Record<string, unknown>): Promise<IUser> {
        return await this.userModel.findOne(options).exec();
    }

    async findById(ID: string): Promise<IUser> {
        return await this.userModel.findById(ID).exec();
    }
    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async update(ID: string, newValue: CreateUserDto): Promise<IUser> {
        const user = await this.userModel.findById(ID).exec();

        if (!user._id) {
            debug('user not found');
        }

        await this.userModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.userModel.findById(ID).exec();
    }
    async delete(ID: string): Promise<string> {
        try {
            await this.userModel.findByIdAndRemove(ID).exec();
            return 'The user has been deleted';
        }
        catch (err) {
            debug(err);
            return 'The user could not be deleted';
        }
    }
    async deleteAll(deleteIds: string[]): Promise<string> {
        try {
            deleteIds.forEach(async (id) => {
                await this.userModel.findByIdAndRemove(id);
            })
            return 'The users has been deleted';
        }
        catch (err) {
            debug(err);
            return 'The users could not be deleted';
        }
    }
}