import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import configuration from 'config/configuration';
import { TestConsumer } from './test.consumer';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService, TestConsumer],
})
export class AppModule {}
