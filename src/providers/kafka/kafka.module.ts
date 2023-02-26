import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import KafkaConfig from 'config/kafka.config';
import { ProducerService } from './producer.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [KafkaConfig],
        }),
    ],
    providers: [ProducerService],
    exports: [ProducerService],
})
export class KafkaModule {}
