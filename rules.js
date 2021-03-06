const
  os = require('os'),
  config = require('./config')(),
  request = require('request-promise-native');


module.exports = async function(message) {
  const response = await match(message);
  if(response !== undefined) return response;
};

const rules = [
  [/(hello|h\Bi*\b|(hey\b)(\s*there)?|what'?s?\s*up|^sup\b|howdy|how[\s.]*doing)/gi, hello],
  [/info(\b|rmation){1}?|status|state/gi, info],
  [/say\s?something|speak|talk/gi, speak],
];

async function match(message) {
  for(const rule of rules) {
    if(message.text.match(rule[0])) return await rule[1](message);
  }
}

function hello(message) {
  return `Hello from ${os.hostname()}`;
}

function info(message) {
  let response = `Message received from ${message.user_info.first_name || message.user_info.username} ${message.is_group ? 'as a part of a group including' : 'in a one-on-one chat with'} ${message.bot_info.name} on the ${message.platform} platform`;
  return response;
}

async function speak(message) {
  const url = `${config.WORDS_SERVICE}/`;
  const response = await request.post(url);
  console.log('Generated text: ' + response);
  return response;
}