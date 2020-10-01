import { Controller, Body, Get, Param, NotFoundException, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from './interfaces/user.interface';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { DeleteUsersDto } from './dto/deleteUsers.dto';

export type RequestWithUser = Request & { user: IUser }

@Controller('/api/users')
export class UsersController {
    constructor(private UserService: UsersService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    async getAllUser() : Promise<IUser[]>{        
        return await this.UserService.findAll();
    }


    @Get('current_user')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    async getCurrentUser(@Req() request: RequestWithUser) : Promise<IUser> {
        const user = request.user;
        return user;
    }

    @Get(':userId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    async getUser(@Param('userId') userId: string) : Promise<IUser>{
        const user = await this.UserService.findById(userId);
        if (!user) throw new NotFoundException('User does not exist!');
        return user;
    }

    @Put(':userId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    async updateUser(@Param('userId') userId: string, @Body() createUserDTO: CreateUserDto) : Promise<IUser> {
        const user = await this.UserService.update(userId, createUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return user;
    }

    @Delete(':userId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    async deleteUser(@Param('userId') userId: string) : Promise<string> {
        const user_delete = await this.UserService.findById(userId);
        if (!user_delete) throw new NotFoundException('User does not exist');        
        return await this.UserService.delete(userId);
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    async deleteMultiUser(@Body() deleteUsersDto: DeleteUsersDto) : Promise<string> {
        const deleteIds = deleteUsersDto.deleteIds;        
        return await this.UserService.deleteAll(deleteIds);
    }
}
