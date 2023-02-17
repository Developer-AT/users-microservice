import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './db.connection.provider';
import databaseConfig from 'config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig],
        }),
    ],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
