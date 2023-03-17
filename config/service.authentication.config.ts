export default () => ({
    service: {
        algo: process.env.JWT_ALGO,
        ttl: 60 * 60 * 1000,
        keys: {
            private: {
                user: process.env.PRIVATE_KEY_USER
            },
            public: {
                auth: process.env.PUBLIC_KEY_AUTH,
                user: process.env.PUBLIC_KEY_USER,
                product: process.env.PUBLIC_KEY_PRODUCT
            }
        }
    }
});
