import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import KafkaConfig from 'config/kafka.config';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [KafkaConfig],
        }),
    ],
    providers: [ProducerService, ConsumerService],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
