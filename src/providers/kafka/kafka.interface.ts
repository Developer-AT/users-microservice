export interface IProducer {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    produce: (message: any) => Promise<void>;
}

export interface IConsumer {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    consume: (message: any) => Promise<void>;
}
