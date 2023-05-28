import { Logger } from '@nestjs/common';
import {
    Consumer,
    ConsumerConfig,
    Kafka,
    KafkaMessage,
    ConsumerSubscribeTopics,
} from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import * as retry from 'async-retry';
import { IConsumer } from './kafka.interface';

export class KafkaConsumerProvider implements IConsumer {
    private readonly kafka: Kafka;
    private readonly consumer: Consumer;
    private readonly logger: Logger;

    constructor(
        private readonly topic: ConsumerSubscribeTopics,
        private readonly config: ConfigService,
        consumerConfig: ConsumerConfig,
    ) {
        this.kafka = new Kafka({
            clientId: this.config.get<string>('kafka.clientId'),
            brokers: [
                this.config.get<string>('kafka.broker1'),
                this.config.get<string>('kafka.broker2'),
            ],
            retry: {
                initialRetryTime: this.config.get<number>(
                    'kafka.initialRetryTime',
                ),
                retries: this.config.get<number>('kafka.connectionRetry'),
            },
        });
        this.consumer = this.kafka.consumer(consumerConfig);

        this.logger = new Logger(`${topic.topics}-${consumerConfig.groupId}`);
    }

    async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
        await this.consumer.subscribe(this.topic);
        await this.consumer.run({
            eachMessage: async ({ message, partition }) => {
                this.logger.debug(`Processing message partition: ${partition}`);
                try {
                    await retry(async () => onMessage(message), {
                        retries: 3,
                        onRetry: (error, attempt) =>
                            this.logger.error(
                                `Error consuming message, executing retry ${attempt}/3...`,
                                error,
                            ),
                    });
                } catch (err) {
                    this.logger.error(
                        'Error consuming message. Adding to dead letter queue...',
                        err,
                    );
                    await this.addMessageToDlq(message);
                }
            },
        });
    }

    private async addMessageToDlq(message: KafkaMessage) {
        this.logger.debug(message);
    }

    async connect() {
        try {
            await this.consumer.connect();
        } catch (err) {
            this.logger.error('Failed to connect to Kafka.', err);
            await this.sleep(5000);
            await this.connect();
        }
    }

    async disconnect() {
        await this.consumer.disconnect();
    }

    async sleep(timeout: number) {
        return new Promise<void>((resolve) => setTimeout(resolve, timeout));
    }
}
