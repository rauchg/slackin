'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slackin;

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _bodyParser = require('body-parser');

var _http = require('http');

var _emailRegex = require('email-regex');

var _emailRegex2 = _interopRequireDefault(_emailRegex);

var _vd = require('vd');

var _vd2 = _interopRequireDefault(_vd);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _slack = require('./slack');

var _slack2 = _interopRequireDefault(_slack);

var _slackInvite = require('./slack-invite');

var _slackInvite2 = _interopRequireDefault(_slackInvite);

var _badge = require('./badge');

var _badge2 = _interopRequireDefault(_badge);

var _splash = require('./splash');

var _splash2 = _interopRequireDefault(_splash);

var _iframe = require('./iframe');

var _iframe2 = _interopRequireDefault(_iframe);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// our code
// es6 runtime requirements
function slackin(_ref) {
  var token = _ref.token;
  var _ref$interval = _ref.interval;
  var interval = _ref$interval === undefined ? 5000 : _ref$interval;
  var org = _ref.org;
  var css = _ref.css;
  var coc = _ref.coc;
  var _ref$cors = _ref.cors;
  var useCors = _ref$cors === undefined ? false : _ref$cors;
  var _ref$path = _ref.path;
  var path = _ref$path === undefined ? '/' : _ref$path;
  var channels = _ref.channels;
  var _ref$silent = _ref.silent;
  var silent = _ref$silent === undefined ? false : _ref$silent;

  // must haves
  if (!token) throw new Error('Must provide a `token`.');
  if (!org) throw new Error('Must provide an `org`.');

  if (channels) {
    // convert to an array
    channels = channels.split(',').map(function (channel) {
      // sanitize channel name
      if ('#' === channel[0]) return channel.substr(1);
      return channel;
    });
  }

  // setup app
  var app = (0, _express2.default)();
  var srv = (0, _http.Server)(app);
  srv.app = app;

  var assets = __dirname + '/assets';

  // fetch data
  var slack = new _slack2.default({ token: token, interval: interval, org: org });

  slack.setMaxListeners(Infinity);

  // capture stats
  (0, _log2.default)(slack, silent);

  // middleware for waiting for slack
  app.use(function (req, res, next) {
    if (slack.ready) return next();
    slack.once('ready', next);
  });

  if (useCors) {
    app.options('*', (0, _cors2.default)());
    app.use((0, _cors2.default)());
  }

  // splash page
  app.get('/', function (req, res) {
    var _slack$org = slack.org;
    var name = _slack$org.name;
    var logo = _slack$org.logo;
    var _slack$users = slack.users;
    var active = _slack$users.active;
    var total = _slack$users.total;

    if (!name) return res.send(404);
    var page = (0, _vd2.default)('html', (0, _vd2.default)('head', (0, _vd2.default)('title', 'Join ', name, ' on Slack!'), (0, _vd2.default)('meta name=viewport content="width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=no"'), (0, _vd2.default)('link rel="shortcut icon" href=https://slack.global.ssl.fastly.net/272a/img/icons/favicon-32.png'), css && (0, _vd2.default)('link rel=stylesheet', { href: css })), (0, _splash2.default)({ coc: coc, path: path, css: css, name: name, org: org, logo: logo, channels: channels, active: active, total: total }));
    res.type('html');
    res.send(page.toHTML());
  });

  app.get('/data', function (req, res) {
    var _slack$org2 = slack.org;
    var name = _slack$org2.name;
    var logo = _slack$org2.logo;
    var _slack$users2 = slack.users;
    var active = _slack$users2.active;
    var total = _slack$users2.total;

    res.send({
      name: name,
      org: org,
      coc: coc,
      logo: logo,
      channels: channels,
      active: active,
      total: total
    });
  });

  // static files
  app.use('/assets', _express2.default.static(assets));

  // invite endpoint
  app.post('/invite', (0, _bodyParser.json)(), function (req, res, next) {
    var chanId = void 0;
    if (channels) {
      var channel = req.body.channel;
      if (!channels.includes(channel)) {
        return res.status(400).json({ msg: 'Not a permitted channel' });
      }
      chanId = slack.getChannelId(channel);
      if (!chanId) {
        return res.status(400).json({ msg: 'Channel not found "' + channel + '"' });
      }
    }

    var email = req.body.email;

    if (!email) {
      return res.status(400).json({ msg: 'No email provided' });
    }

    if (!(0, _emailRegex2.default)().test(email)) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    if (coc && '1' != req.body.coc) {
      return res.status(400).json({ msg: 'Agreement to CoC is mandatory' });
    }

    (0, _slackInvite2.default)({ token: token, org: org, email: email, channel: chanId }, function (err) {
      if (err) {
        if (err.message === 'Sending you to Slack...') {
          return res.status(303).json({ msg: err.message, redirectUrl: 'https://' + org + '.slack.com' });
        }

        return res.status(400).json({ msg: err.message });
      }

      res.status(200).json({ msg: 'WOOT. Check your email!' });
    });
  });

  // iframe
  app.get('/iframe', function (req, res) {
    var large = 'large' in req.query;
    var _slack$users3 = slack.users;
    var active = _slack$users3.active;
    var total = _slack$users3.total;

    res.type('html');
    res.send((0, _iframe2.default)({ path: path, active: active, total: total, large: large }).toHTML());
  });

  app.get('/iframe/dialog', function (req, res) {
    var large = 'large' in req.query;
    var name = slack.org.name;
    var _slack$users4 = slack.users;
    var active = _slack$users4.active;
    var total = _slack$users4.total;

    if (!name) return res.send(404);
    var dom = (0, _splash2.default)({ coc: coc, path: path, name: name, org: org, channels: channels, active: active, total: total, large: large, iframe: true });
    res.type('html');
    res.send(dom.toHTML());
  });

  // badge js
  app.use('/slackin.js', _express2.default.static(assets + '/badge.js'));

  // badge rendering
  app.get('/badge.svg', function (req, res) {
    res.type('svg');
    res.set('Cache-Control', 'max-age=0, no-cache');
    res.set('Pragma', 'no-cache');
    res.send((0, _badge2.default)(slack.users).toHTML());
  });

  // realtime
  (0, _socket2.default)(srv).on('connection', function (socket) {
    socket.emit('data', slack.users);
    var change = function change(key, val) {
      return socket.emit(key, val);
    };
    slack.on('change', change);
    socket.on('disconnect', function () {
      slack.removeListener('change', change);
    });
  });

  return srv;
}

// their code