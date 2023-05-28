import { Kafka, Message, Producer, Partitioners } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { IProducer } from './kafka.interface';

export class KafkaProducerProvider implements IProducer {
    private readonly kafka: Kafka;
    private readonly producer: Producer;

    constructor(
        private readonly topic: string,
        private readonly config: ConfigService,
    ) {
        this.kafka = new Kafka({
            clientId: this.config.get<string>('kafka.clientId'),
            brokers: [
                this.config.get<string>('kafka.broker1'),
                this.config.get<string>('kafka.broker2'),
                this.config.get<string>('kafka.broker3'),
            ],
            retry: {
                initialRetryTime: this.config.get<number>(
                    'kafka.initialRetryTime',
                ),
                retries: this.config.get<number>('kafka.connectionRetry'),
            },
        });
        this.producer = this.kafka.producer({
            allowAutoTopicCreation: true,
            createPartitioner: Partitioners.DefaultPartitioner,
        });
    }

    async produce(message: Message) {
        await this.producer.send({
            topic: this.topic,
            messages: [message],
            acks: -1,
        });
    }

    async connect() {
        try {
            await this.producer.connect();
        } catch (err) {
            console.error('Failed to connect to Kafka.', err);
        }
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}
