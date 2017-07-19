const
  config = require('./config')(),
  rules = require('./rules'),
  nlp = require('./nlp'),
  queues = require('./queues');

/**
 * Develop a response for the incoming message
 * Break on the first 'check' that returns a message
 * @param {string} normalizedMessage 
 */
exports.think = function(normalizedMessage) {

  let text;

  const checks = [
    // nlp,
    rules
  ];

  for(const c of checks) {
    text = c(normalizedMessage);
    if(text !== undefined) break;
  }
  console.log(`${normalizedMessage.text} => ${text !== undefined ? text : 'no response'}`);
  if(text === undefined) return;
  emit(buildMessage(text, normalizedMessage), normalizedMessage.platform);
}

function buildMessage(text, normalizedMessage) {
  return {
    text,
    chat_id: normalizedMessage.is_group ? normalizedMessage.group_id : normalizedMessage.user_id,
    keyboard: null
  };
}

function emit(message, platform) {
  queues.publish(message, `message.${platform}.outgoing`, config.EXCHANGE_NAME);
}
