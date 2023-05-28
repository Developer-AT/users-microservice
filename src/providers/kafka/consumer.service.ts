import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerConfig, ConsumerSubscribeTopics, KafkaMessage } from 'kafkajs';
import { IConsumer } from './kafka.interface';
import { KafkaConsumerProvider } from './consumer.provider';

interface KafkajsConsumerOptions {
    topic: ConsumerSubscribeTopics;
    consumerConfig: ConsumerConfig;
    onMessage: (message: KafkaMessage) => Promise<void>;
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly consumers: IConsumer[] = [];

    constructor(private readonly config: ConfigService) {}

    async consume({
        topic,
        consumerConfig,
        onMessage,
    }: KafkajsConsumerOptions) {
        const consumer = new KafkaConsumerProvider(
            topic,
            this.config,
            consumerConfig,
        );
        await consumer.connect();
        await consumer.consume(onMessage);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}
