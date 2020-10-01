import { Controller, UseGuards, HttpStatus, Response, Post, Body, Get, Res, Req, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { RequestWithUser } from 'src/users/users.controller';
import { ChangePasswordUserDto } from 'src/users/dto/changePasswordUser.dto';

@ApiTags('auth')
@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService) { }

    @Post('register')
    public async register(@Response() res, @Body() createUserDto: CreateUserDto) {
        const result = await this.authService.register(createUserDto);
        if (!result.success) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    public async login(@Response() res, @Body() login: LoginUserDto) {
        return await this.usersService.findOne({ username: login.username }).then((user: any) => {
            if (!user) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'User Not Found',
                });
            } else {
                console.log('start getting the token');
                const token = this.authService.createToken(user);
                console.log(user)
                return res.status(HttpStatus.OK).json({
                    user: { ...user._doc, ...token }
                });
            }
        });
    }

    @Post('changePassword')
    @UseGuards(AuthGuard('jwt'))
    public async changePassword(@Response() res, @Body() changePasswordUser: ChangePasswordUserDto) {
        const result = await this.authService.changePassword(changePasswordUser);
        if (!result.success) {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async userLogin(@Res() res, @Req() request: RequestWithUser) {
        const user = request.user;
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            user
        })
    }
}