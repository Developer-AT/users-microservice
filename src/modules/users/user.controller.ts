import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse()
  @Get(':userId')
  getUser() {
    return this.userService.getUser();
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @Post('add')
  addAuthor() {
    return this.userService.addUser();
  }

  @Put('updated/:userId')
  updateUserById() {
    return this.userService.updateUserById();
  }

  @Delete('delete/:userId')
  deleteUserById() {
    return this.userService.deleteUserById();
  }
}
