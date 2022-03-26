import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
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
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Roles('user')
  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUser(@Param('userId') userId: string) {
    return await this.userService.getUser(userId);
  }

  @Post('add')
  async addAuthor(@Body() createUserDto: CreateUserDto) {
    return await this.userService.addUser(createUserDto);
  }

  @Put('updated/:userId')
  async updateUserById(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUserById(userId, updateUserDto);
  }

  @Delete('delete/:userId')
  async deleteUserById(@Param('userId') userId: string) {
    return await this.userService.deleteUserById(userId);
  }
}
