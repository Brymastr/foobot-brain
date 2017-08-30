module.exports = () => {
  const env = process.env;
  return config = {
    // Connections
    AMQP_CONNECTION: env.AMQP_CONNECTION || 'amqp://localhost',
    EXCHANGE_NAME: 'messages',
    AMQP_CONNECTION_RETRY_INTERVAL: 3000,
    AMQP_CONNECTION_ATTEMPTS: 10,
    
    // Subscribe
    PROCESSING_QUEUE_NAME: 'processing',
    PROCESSING_ROUTE_KEY: 'message.*.normalized',

    // Other services
    WORDS_SERVICE: env.WORDS_SERVICE || 'http://172.17.0.2:3000'

    // Publish
    // OUTGOING_ROUTE_KEY: 'message.<platform>.outgoing',
  }
};

/**
 * NORMALIZED OUTGOING message
 */
const message = {
  text: String,
  chat_id: String,
  keyboard: Object      // Generic keyboard to be denormalized for each platform
};