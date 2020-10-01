import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../users/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel('User') userModel: PassportLocalModel<IUser>) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        }, userModel.authenticate());
    }
}