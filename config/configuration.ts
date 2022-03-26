export default () => ({
  port: parseInt(process.env.PORT, 8080) || 3000,
  database: {
    library: process.env.DB_URL
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    url: process.env.REDIS_URL
  }
});