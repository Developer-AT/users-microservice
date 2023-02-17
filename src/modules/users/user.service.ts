import {
    UpdateUserDto,
    CreateUserDto,
    UserAuthDto,
    ValidateUserExistence,
    CreateUserOnMongoDto,
} from './dto/user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { RedisProvider } from 'src/providers/redis/redis.provider';
import { AuthProvider } from 'src/providers/grpc/auth/auth.provider';
import {
    CreateUser,
    GenerateToken,
} from 'src/providers/grpc/auth/auth.interface';
import { UserEntity } from 'src/entity/user.entity';
import { UserRole } from 'src/interfaces/enums';

@Injectable()
export class UserService {
    constructor(
        private readonly userEntity: UserEntity,
        private readonly redis: RedisProvider,
        private readonly authprovider: AuthProvider,
    ) {}

    async getUserById(userId: string) {
        const userFromRedis = await this.redis.get(userId);
        console.log(`userFromRedis :: ${userFromRedis}`);
        if (userFromRedis) {
            return JSON.parse(userFromRedis);
        } else {
            const user = await this.userEntity.getDataById(userId);
            if (user) this.redis.set(userId, JSON.stringify(user), 5000);
            return user;
        }
    }

    async createUser(createUserDto: CreateUserDto) {
        const validateUserExistenceCriteria: ValidateUserExistence = {
            username: createUserDto.username,
            email: createUserDto.email,
        };
        const isUserExist = await this.userEntity.isUserAlreadyExist(
            validateUserExistenceCriteria,
        );
        if (isUserExist) {
            throw new ConflictException('User Already Exist');
        }

        const dataToSaveInIdentityProvider: CreateUser = {
            username: createUserDto.username,
            email: createUserDto.email,
            password: createUserDto.password,
            clientRole: UserRole.BRONZE,
        };

        const keycloakUserData = await this.authprovider.createUser(
            dataToSaveInIdentityProvider,
        );

        const dataToSave: CreateUserOnMongoDto = {
            ...createUserDto,
            keycloakId: keycloakUserData.data.id,
        };
        delete dataToSave.password;
        return await this.userEntity.createUser(dataToSave);
    }

    async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
        return await this.userEntity.updateUser(userId, updateUserDto);
    }

    async deleteUserById(userId: string) {
        return await this.userEntity.deleteUser(userId);
    }

    async getAccessToken(userAuthDetail: UserAuthDto) {
        const authDetail: GenerateToken = {
            username: userAuthDetail.username,
            password: userAuthDetail.password,
        };

        console.log('authDetail::', authDetail);
        const response = await this.authprovider.generateToken(authDetail);
        console.log(response);
        return response;
    }
}
