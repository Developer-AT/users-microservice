import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @Roles('user')
    @Get(':userId')
    @UseGuards(AuthGuard)
    async getUserById(@Param('userId') userId: string) {
        return await this.userService.getUserById(userId);
    }

    @Post('create')
    async addAuthor(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Put('updated/:userId')
    async updateUserById(
        @Param('userId') userId: string,
        @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.updateUserById(userId, updateUserDto);
    }

    @Delete('delete/:userId')
    async deleteUserById(@Param('userId') userId: string) {
        return await this.userService.deleteUserById(userId);
    }
}
