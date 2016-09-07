'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = badge;

var _vd = require('vd');

var _vd2 = _interopRequireDefault(_vd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var title = 'slack';
var color = '#E01563';
var pad = 8; // left / right padding
var sep = 4; // middle separation

function badge(_ref) {
  var total = _ref.total;
  var active = _ref.active;

  var value = active ? active + '/' + total : '' + total || '–';
  var lw = pad + width(title) + sep; // left side width
  var rw = sep + width(value) + pad; // right side width
  var tw = lw + rw; // total width

  return (0, _vd2.default)('svg xmlns="http://www.w3.org/2000/svg" width=' + tw + ' height=20', (0, _vd2.default)('rect rx=3 width=' + tw + ' height=20 fill=#555'), (0, _vd2.default)('rect rx=3 x=' + lw + ' width=' + rw + ' height=20 fill=' + color), (0, _vd2.default)('path d="M' + lw + ' 0h' + sep + 'v20h-' + sep + 'z" fill=' + color), (0, _vd2.default)('g text-anchor=middle font-family=Verdana font-size=11', text({ str: title, x: Math.round(lw / 2), y: 14 }), text({ str: value, x: lw + Math.round(rw / 2), y: 14 })));
}

// generate text with 1px shadow
function text(_ref2) {
  var str = _ref2.str;
  var x = _ref2.x;
  var y = _ref2.y;

  return [(0, _vd2.default)('text fill=#010101 fill-opacity=.3 x=' + x + ' y=' + (y + 1), str), (0, _vd2.default)('text fill=#fff x=' + x + ' y=' + y, str)];
}

// π=3
function width(str) {
  return 7 * str.length;
}