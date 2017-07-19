module.exports = function(message) {
  const response = match(message)
  if(response !== undefined) return response;
};

const rules = [
  [/(hello|h\Bi*\b|(hey\b)(\s*there)?|what'?s?\s*up|sup)/gi, hello]
];

function match(message) {
  for(const r of rules) {
    if(message.text.match(r[0])) return r[1]();
  }
}

function hello(message) {
  return 'Hello from';
}