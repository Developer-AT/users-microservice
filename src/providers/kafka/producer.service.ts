import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'kafkajs';
import { KafkaProducerProvider } from './producer.provider';
import { IProducer } from './kafka.interface';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
    private readonly producers = new Map<string, IProducer>();

    constructor(private readonly config: ConfigService) {}

    async produce(topic: string, message: Message) {
        const producer = await this.getProducer(topic);
        await producer.produce(message);
    }

    private async getProducer(topic: string) {
        let producer = this.producers.get(topic);
        if (!producer) {
            producer = new KafkaProducerProvider(topic, this.config);
            await producer.connect();
            this.producers.set(topic, producer);
        }
        return producer;
    }

    async onApplicationShutdown() {
        for (const producer of this.producers.values()) {
            await producer.disconnect();
        }
    }
}
