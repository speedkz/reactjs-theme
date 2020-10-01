import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PassportLocalModel } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { ChangePasswordUserDto } from 'src/users/dto/changePasswordUser.dto';

@Injectable()
export class AuthService {
    
    constructor(private readonly usersService: UsersService,
        @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>) { }

    async register(user: CreateUserDto) {
        const status: RegistrationStatus = { success: true, message: 'user register' };
        await this.userModel.register(new this.userModel({
            username: user.username,
            fullName: user.fullName,
            roles: user.roles,
            company: user.company
        }), user.password);
        return status;
    }

    async changePassword(user: ChangePasswordUserDto) {
        const status: RegistrationStatus = { success: true, message: 'password changed' };
        const changePasswordUser = await this.userModel.findByUsername(user.username, false);
        await changePasswordUser.changePassword(user.password,user.newPassword);
        return status;
    }

    createToken(user) {
        const expiresIn = 3600;
        const accessToken = jwt.sign({
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            appToken: user.appToken
        }, 'ILovePokemon', { expiresIn });
        console.log(accessToken);
        return {
            expiresIn,
            accessToken,
        };
    }
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findById(payload.id);
    }
}