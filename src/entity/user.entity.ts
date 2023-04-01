import {
    Injectable,
    Inject,
    Module,
    BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import {
    CreateUserOnMongoDto,
    UpdateUserDto,
    ValidateUserExistence,
} from 'src/modules/users/dto/user.dto';
import { Dao } from 'src/providers/database/dao.provider';
import { UserDocument } from 'src/providers/schemas/user.schema';

@Injectable()
export class UserEntity extends Dao {
    constructor(@Inject('USER_MODEL') private userModel: Model<UserDocument>) {
        super(userModel);
    }

    async getUserById(userId: string) {
        return await this.getDataById(userId);
    }

    async getUserByKeycloakId(keycloakId: string) {
        return await this.findOne({ keycloakId: keycloakId });
    }

    async createUser(createUserDto: CreateUserOnMongoDto) {
        return await this.saveData(createUserDto);
    }

    async updateUser(userId: string, createUserDto: UpdateUserDto) {
        return await this.updateOne({ _id: userId }, createUserDto);
    }

    async deleteUser(userId: string) {
        return await this.removeOne({ _id: userId });
    }

    async isUserAlreadyExist(data: ValidateUserExistence) {
        if (Object.keys(data).length < 1) {
            throw new BadRequestException('Insufficient Data');
        }

        let orCriteria = [];
        if (data.username) {
            orCriteria.push({
                username: data.username,
            });
        }

        if (data.email) {
            orCriteria.push({
                email: data.email,
            });
        }

        const criteria = { $or: orCriteria };
        const user = await this.findOne(criteria);
        console.log('User--Entity--isUserAlreadyExist--user', user);
        return Boolean(user);
    }
}
