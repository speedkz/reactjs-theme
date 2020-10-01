import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/passport/jwt.strategy';
import { LocalStrategy } from 'src/auth/passport/local.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtStrategy, LocalStrategy],
    exports: [UsersService, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class UsersModule { }