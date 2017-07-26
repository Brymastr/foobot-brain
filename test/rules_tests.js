const
  assert = require('assert'),
  rewire = require('rewire');

describe('rules', function() {
  const rules = rewire('../rules');
  
  describe('#match()', function() {
    const match = rules.__get__('match');

    
  });

  describe('#info()', function() {
    const info = rules.__get__('info');

    it(`should return a valid info message if the incoming message is not from a group`, function() {
      const message = {
        text: 'this message should be caught by the info rule',
        date: 1501003052,
        user_id: 102330327,
        group_id: null,
        is_group: false,
        platform: 'messenger',
        user_info: {
          first_name: 'Jillian',
          last_name: 'Last Name',
          username: 'a_userNAme123'
        },
        bot_info: {
          name: 'foobot_dev',
          id: 420476595
        }
      };

      const expected = `Message received from Jillian in a one-on-one chat with foobot_dev on the messenger platform`;
      const actual = info(message);
      assert.equal(expected, actual);
    });

    it(`should return a valid info message if the incoming message is from a group`, function() {
      const message = {
        text: 'this message should be caught by the info rule',
        date: 1501003052,
        user_id: 102330327,
        group_id: 449330922,
        is_group: true,
        platform: 'messenger',
        user_info: {
          first_name: 'Jillian',
          last_name: 'Last Name',
          username: 'a_userNAme123'
        },
        bot_info: {
          name: 'foobot_dev',
          id: 420476595
        }
      };

      const expected = `Message received from Jillian as a part of a group including foobot_dev on the messenger platform`;
      const actual = info(message);
      assert.equal(expected, actual);
    });

    it(`should return a valid default actual if the user has no first_name`, function() {
      const message = {
        text: 'this message should be caught by the defaultResponse rule',
        date: 1501003052,
        user_id: 102330327,
        group_id: null,
        is_group: false,
        platform: 'telegram',
        user_info: {
          first_name: null,
          last_name: 'Last Name',
          username: 'a_userNAme123'
        },
        bot_info: {
          name: 'foobot_dev',
          id: 420476595
        }
      };

      const expected = `Message received from a_userNAme123 in a one-on-one chat with foobot_dev on the telegram platform`;
      const actual = info(message);
      assert.equal(expected, actual);
    });

  });
})