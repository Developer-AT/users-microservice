import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResponseUtilsProvider } from './response.utils.provider';

@Module({
    imports: [],
    providers: [ResponseUtilsProvider],
    exports: [ResponseUtilsProvider],
})
export class UtilsModule {}
