'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invite;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function invite(_ref, fn) {
  var org = _ref.org;
  var token = _ref.token;
  var email = _ref.email;
  var channel = _ref.channel;

  var data = { email: email, token: token };

  if (channel) {
    data.channels = channel;
    data.ultra_restricted = 1;
    data.set_active = true;
  }

  _superagent2.default.post('https://' + org + '.slack.com/api/users.admin.invite').type('form').send(data).end(function (err, res) {
    if (err) return fn(err);
    if (200 != res.status) {
      fn(new Error('Invalid response ' + res.status + '.'));
      return;
    }

    // If the account that owns the token is not admin, Slack will oddly
    // return `200 OK`, and provide other information in the body. So we
    // need to check for the correct account scope and call the callback
    // with an error if it's not high enough.
    var _res$body = res.body;
    var ok = _res$body.ok;
    var providedError = _res$body.error;
    var needed = _res$body.needed;

    if (!ok) {
      if (providedError === 'missing_scope' && needed === 'admin') {
        fn(new Error('Missing admin scope: The token you provided is for an account that is not an admin. You must provide a token from an admin account in order to invite users through the Slack API.'));
      } else if (providedError === 'already_invited') {
        fn(new Error('You have already been invited to Slack. Check for an email from feedback@slack.com.'));
      } else if (providedError === 'already_in_team') {
        fn(new Error('Sending you to Slack...'));
      } else {
        fn(new Error(providedError));
      }
      return;
    }

    fn(null);
  });
}