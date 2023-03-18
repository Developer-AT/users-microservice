import { ClientType, UserRole } from 'src/interfaces/enums';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccessBy, HavingRole } from 'src/decorators/access-control.decorator';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, UserAuthDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @Get(':userId')
    @UseGuards(AuthGuard)
    async getUserById(@Param('userId') userId: string) {
        return await this.userService.getUserById(userId);
    }

    @Post()
    async addUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @Put(':userId')
    async updateUserById(
        @Param('userId') userId: string,
        @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.updateUserById(userId, updateUserDto);
    }

    @ApiBearerAuth()
    @AccessBy(ClientType.USER)
    @HavingRole(UserRole.BRONZE, UserRole.SILVER, UserRole.GOLD)
    @Delete(':userId')
    async deleteUserById(@Param('userId') userId: string) {
        return await this.userService.deleteUserById(userId);
    }

    @Post('accessToken')
    async getAccessToken(
        @Body(new ValidationPipe()) userAuthDetail: UserAuthDto,
    ) {
        try {
            console.log('userAuthDetail :: ', userAuthDetail);
            return await this.userService.getAccessToken(userAuthDetail);
        } catch (error) {
            throw error;
        }
    }
}
