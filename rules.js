const os = require('os');


module.exports = function(message) {
  const response = match(message)
  if(response !== undefined) return response;
};

const rules = [
  [/(hello|h\Bi*\b|(hey\b)(\s*there)?|what'?s?\s*up|^sup\b|howdy|how[\s.]*doing)/gi, hello],
  [/info(\b|rmation){1}?|status|state/gi, info],
];

function match(message) {
  for(const r of rules) {
    if(message.text.match(r[0])) return r[1]();
  }
}

function hello(message) {
  return `Hello from ${os.hostname()}`;
}

function info(message) {
  let response = `Message received from ${message.user_info.first_name || message.user_info.username} ${message.is_group ? 'as a part of a group including' : 'in a one-on-one chat with'} ${message.bot_info.name} on the ${message.platform} platform`;
  return response;
}