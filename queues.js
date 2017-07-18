const
  amqp = require('amqplib'),
  config = require('./config')();

let connection;

exports.setup = async function() {
  console.log('attempting amqp connection');

  // Connect
  connection = await amqp.connect(config.AMQP_CONNECTION);
  const channel = await connection.createChannel();

  // Assert exchange
  await channel.assertExchange(config.EXCHANGE_NAME, 'topic');

  // Assert processing queue
  await channel.assertQueue(config.PROCESSING_QUEUE_NAME);
  channel.bindQueue(config.PROCESSING_QUEUE_NAME, config.EXCHANGE_NAME, config.PROCESSING_ROUTE_KEY);

  // Close channel and return
  console.log('amqp connection successful');
  return connection;
}

exports.consume = async function(queueName, exchangeName, routeKey, func) {
  const channel = await connection.createChannel();

  channel.consume(queueName, async message => {
    const m = JSON.parse(message.content.toString());

    try {
      await func(m);
      channel.ack(message);
    } catch(err) {
      console.error(err);
      channel.nack(message);
    }

  });
}

exports.publish = async function(message, routeKey, exchangeName) {
  const channel = await connection.createChannel();
  channel.publish(exchangeName, routeKey, new Buffer(JSON.stringify(message)));
  channel.close();  
};