'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlackData = function (_EventEmitter) {
  _inherits(SlackData, _EventEmitter);

  function SlackData(_ref) {
    var token = _ref.token;
    var interval = _ref.interval;
    var host = _ref.org;

    _classCallCheck(this, SlackData);

    var _this = _possibleConstructorReturn(this, (SlackData.__proto__ || Object.getPrototypeOf(SlackData)).call(this));

    _this.host = host;
    _this.token = token;
    _this.interval = interval;
    _this.ready = false;
    _this.org = {};
    _this.users = {};
    _this.channelsByName = {};
    _this.init();
    _this.fetch();
    return _this;
  }

  _createClass(SlackData, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      _superagent2.default.get('https://' + this.host + '.slack.com/api/channels.list').query({ token: this.token }).end(function (err, res) {
        (res.body.channels || []).forEach(function (channel) {
          _this2.channelsByName[channel.name] = channel;
        });
      });

      _superagent2.default.get('https://' + this.host + '.slack.com/api/team.info').query({ token: this.token }).end(function (err, res) {
        var team = res.body.team;
        if (!team) {
          throw new Error('Bad Slack response. Make sure the team name and API keys are correct');
        }
        _this2.org.name = team.name;
        if (!team.icon.image_default) {
          _this2.org.logo = team.icon.image_132;
        }
      });
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      var _this3 = this;

      _superagent2.default.get('https://' + this.host + '.slack.com/api/users.list').query({ token: this.token, presence: 1 }).end(function (err, res) {
        _this3.onres(err, res);
      });
      this.emit('fetch');
    }
  }, {
    key: 'getChannelId',
    value: function getChannelId(name) {
      var channel = this.channelsByName[name];
      return channel ? channel.id : null;
    }
  }, {
    key: 'retry',
    value: function retry() {
      var interval = this.interval * 2;
      setTimeout(this.fetch.bind(this), interval);
      this.emit('retry');
    }
  }, {
    key: 'onres',
    value: function onres(err, res) {
      if (err) {
        this.emit('error', err);
        return this.retry();
      }

      var users = res.body.members;

      if (!users) {
        var _err = new Error('Invalid Slack response: ' + res.status);
        this.emit('error', _err);
        return this.retry();
      }

      // remove slackbot and bots from users
      // slackbot is not a bot, go figure!
      users = users.filter(function (x) {
        return x.id != 'USLACKBOT' && !x.is_bot && !x.deleted;
      });

      var total = users.length;
      var active = users.filter(function (user) {
        return 'active' === user.presence;
      }).length;

      if (this.users) {
        if (total != this.users.total) {
          this.emit('change', 'total', total);
        }
        if (active != this.users.active) {
          this.emit('change', 'active', active);
        }
      }

      this.users.total = total;
      this.users.active = active;

      if (!this.ready) {
        this.ready = true;
        this.emit('ready');
      }

      setTimeout(this.fetch.bind(this), this.interval);
      this.emit('data');
    }
  }]);

  return SlackData;
}(_events.EventEmitter);

exports.default = SlackData;