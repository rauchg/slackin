'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = iframe;

var _vd = require('vd');

var _vd2 = _interopRequireDefault(_vd);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logo = (0, _fs.readFileSync)(__dirname + '/assets/slack.svg').toString('base64');
var js = (0, _fs.readFileSync)(__dirname + '/assets/iframe.js').toString();
var css = (0, _fs.readFileSync)(__dirname + '/assets/iframe-button.css').toString();

function iframe(_ref) {
  var path = _ref.path;
  var active = _ref.active;
  var total = _ref.total;
  var large = _ref.large;

  var str = '';
  if (active) str = active + '/';
  if (total) str += total;
  if (!str.length) str = '–';

  var opts = { 'class': large ? 'slack-btn-large' : '' };
  var div = (0, _vd2.default)('span.slack-button', opts, (0, _vd2.default)('a.slack-btn href=/ target=_blank', (0, _vd2.default)('span.slack-ico'), (0, _vd2.default)('span.slack-text', 'Slack')), (0, _vd2.default)('a.slack-count href=/ target=_blank', str), (0, _vd2.default)('style', css), _vd2.default.style().add('.slack-ico', {
    'background-image': 'url(data:image/svg+xml;base64,' + logo + ')'
  }), (0, _vd2.default)('script', '\n      data = {};\n      data.path = ' + JSON.stringify(path) + ';\n      data.total = ' + (total != null ? total : 'null') + ';\n      data.active = ' + (active != null ? active : 'null') + ';\n    '), (0, _vd2.default)('script', js));

  return div;
}

function gradient(css, sel, params) {
  ['-webkit-', '-moz-', ''].forEach(function (p) {
    css.add(sel, {
      'background-image': p + 'linear-gradient(' + params + ')'
    });
  });
}