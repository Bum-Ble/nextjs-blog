"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dataSource = require("./data-source");
var _Post = require("./entity/Post");
_dataSource.AppDataSource.initialize().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var posts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.manager.find(_Post.Post);
          case 2:
            posts = _context.sent;
            if (!(posts.length === 0)) {
              _context.next = 6;
              break;
            }
            _context.next = 6;
            return connection.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) {
              return new _Post.Post("Post ".concat(n), "\u8FD9\u662F\u7B2C".concat(n, "\u4E2A\u535A\u5BA2"));
            }));
          case 6:
            console.log('posts 数据填充完了');
            connection.close();
          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});