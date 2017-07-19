const
  config = require('./config')(),
  rules = require('./rules'),
  nlp = require('./nlp');

module.export = function() {

  /**
   * Develop a response for the incoming message
   * Return on the first 'check' to return a message
   * @param {string} normalizedMessage 
   */
  async function think(normalizedMessage) {
    const checks = [
      nlp,
      rules
    ];

    for(const c of checks) {
      const message = c(normalizedMessage);
      if(message !== undefined) return message;
    }
  }

  function buildMessage(normalizedMessage) {
    const message = {
      // text: normalizedMessage.text,
      text: os.hostname(),
      chat_id: normalizedMessage.is_group ? normalizedMessage.group_id : normalizedMessage.user_id,
      keyboard: null
    };
  }

  function emit(message, platform) {
    queues.publish(message, `message.${platform}.outgoing`, config.EXCHANGE_NAME);
  }

};