import { UpdateUserDto, CreateUserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModelName } from 'src/schemas/user.schema';
import { RedisProvider } from 'src/providers/redis/redis.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModelName) private userModel: Model<UserDocument>,
    private readonly redis: RedisProvider,
  ) {}

  async getUserById(userId: string) {
    const userFromRedis = await this.redis.get(userId);
    console.log(`userFromRedis :: ${userFromRedis}`);
    if (userFromRedis) {
      return JSON.parse(userFromRedis);
    } else {
      const user = await this.userModel.findById(userId);
      if (user) this.redis.set(userId, JSON.stringify(user), 5000);
      return user;
    }
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
