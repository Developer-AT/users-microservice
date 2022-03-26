import { UpdateUserDto, CreateUserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModelName } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModelName) private userModel: Model<UserDocument>,
  ) {}

  async getUser(userId: string) {
    return await this.userModel.findById(userId);
  }

  async addUser(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    const result = await user.save();
    console.log(result);
    return result;
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: userId }, updateUserDto);
  }

  async deleteUserById(userId: string) {
    return await this.userModel.deleteOne({ _id: userId });
  }
}
