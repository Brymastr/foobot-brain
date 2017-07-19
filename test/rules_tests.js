const assert = require('assert');

describe('rules', function() {
  const rules = require('../rules');
  
  describe('#match()', function() {

    it(`should return 'Hello!' when the message contains hello`, function() {
      const message = 'hello';
      const expected = 'Hello!';
      const response = rules(message);
      assert.equal(expected, response);
    });

    it(`should return 'Hello!' when the message contains 'hey there'`, function() {
      const message = 'hey     there!';
      const expected = 'Hello!';
      const response = rules(message);
      assert.equal(expected, response);
    });

    it(`should return 'Hello!' when the message contains 'what's up?`, function() {
      const message = `what's up?`;
      const expected = 'Hello!';
      const response = rules(message);
      assert.equal(expected, response);
    });

    it(`should return 'Hello!' when the message contains 'whats up?`, function() {
      const message = `whats up?`;
      const expected = 'Hello!';
      const response = rules(message);
      assert.equal(expected, response);
    });

    it(`should return 'Hello!' when the message contains 'what up?`, function() {
      const message = `what up?`;
      const expected = 'Hello!';
      const response = rules(message);
      assert.equal(expected, response);
    });

    it(`should return 'Hello!' when the message contains 'what up?`, function() {
      const message = `what up?`;
      const expected = 'Hello!';
      const response = rules(message);
      assert.equal(expected, response);
    });

    it(`should not return 'Hello!' when the message doesn't contain hello`, function() {
      const message = 'this is a message that contains words that might trigger the hell o rule h i heyo what is there';
      const expected = 'Hello!';
      const response = rules(message);
      assert.notEqual(expected, response);
    });
  });
})