const
  config = require('./config')(),
  amqp = require('amqplib'),
  request = require('request-promise-native'),
  queues = require('./queues'),
  os = require('os'),
  brain = require('./brain');


main();

function connect(func, attempts, interval) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await func());
    } catch(err) {
      // console.error(err)
      if(attempts === 1) {
        reject(new Error('Max connection attempts reached'));
        return;
      }
      setTimeout(async () => {
        resolve(await connect(func, --attempts, interval));
      }, interval);
    }
  });
}

async function main() {

  await connect(queues.setup, config.AMQP_CONNECTION_ATTEMPTS, config.AMQP_CONNECTION_RETRY_INTERVAL);

  // Subscribe to messages to be sent to Telegram
  queues.consume(
    config.PROCESSING_QUEUE_NAME,
    config.EXCHANGE_NAME,
    config.PROCESSING_ROUTE_KEY,
    await brain.think
  );

  console.log('the brain is in control');
}

