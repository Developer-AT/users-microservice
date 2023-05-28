import { MicroserviceGuard } from 'src/guards/microservice.guard';
import { GrpcMethod } from '@nestjs/microservices';
import { ClientType, ServiceType, UserRole } from 'src/interfaces/enums';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccessBy, HavingRole } from 'src/decorators/access-control.decorator';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CreateUserDto,
    UpdateUserDto,
    UserAuthDto,
    GrpcGetUserPayload,
} from './dto/user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { ResponseUtilsProvider } from 'src/providers/utils/response.utils.provider';
import { GRpcTransformInterceptor } from 'src/interceptors/grpc-response.interceptor';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly responseUtils: ResponseUtilsProvider,
    ) {}

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
    @Patch(':userId')
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

    @GrpcMethod('UserService', 'GetUserById')
    @AccessBy(ServiceType.PRODUCT)
    @UseGuards(MicroserviceGuard)
    @UseInterceptors(GRpcTransformInterceptor)
    async GetUserById(
        payload: GrpcGetUserPayload,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>,
    ) {
        try {
            const userData = await this.userService.getUserById(payload.id);
            return this.responseUtils.successResponse(userData);
        } catch (error) {
            console.error('User--Controller--GetUserById--Error', error);
            return this.responseUtils.errorResponse(error);
        }
    }

    @GrpcMethod('UserService', 'GetUserByKeycloakId')
    @AccessBy(ServiceType.PRODUCT)
    @UseGuards(MicroserviceGuard)
    @UseInterceptors(GRpcTransformInterceptor)
    async GetUserByKeycloakId(
        payload: GrpcGetUserPayload,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>,
    ) {
        try {
            const userData = await this.userService.getUserByKeycloakId(
                payload.id,
            );
            return this.responseUtils.successResponse(userData);
        } catch (error) {
            console.error(
                'User--Controller--GetUserByKeycloakId--Error',
                error,
            );
            return this.responseUtils.errorResponse(error);
        }
    }
}
