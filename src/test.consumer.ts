import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './providers/kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) {}

    async onModuleInit() {
        await this.consumerService.consume({
            topic: { topics: ['logging'] },
            consumerConfig: { groupId: 'logger' },
            onMessage: async (message) => {
                console.log({
                    value: message.value.toString(),
                });
                throw new Error('Test error!');
            },
        });
    }
}
