export default () => ({
    kafka: {
        broker1: process.env.KAFKA_BROKER_1,
        broker2: process.env.KAFKA_BROKER_2,
        clientId: process.env.KAFKA_CLIENT_ID,
        connectionRetry: 5,
        initialRetryTime: 100,
        topics: {
            logging: 'logging',
            sendMail: 'send-mail',
        }
    }
});