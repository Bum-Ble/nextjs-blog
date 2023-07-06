"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePosts1688608173903 = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _typeorm = require("typeorm");
var CreatePosts1688608173903 = /*#__PURE__*/function () {
  function CreatePosts1688608173903() {
    (0, _classCallCheck2["default"])(this, CreatePosts1688608173903);
  }
  (0, _createClass2["default"])(CreatePosts1688608173903, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryRunner) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return queryRunner.createTable(new _typeorm.Table({
                  name: 'posts',
                  columns: [{
                    name: 'id',
                    isGenerated: true,
                    type: 'int',
                    generationStrategy: 'increment',
                    isPrimary: true
                  }, {
                    name: 'title',
                    type: 'varchar'
                  }, {
                    name: 'content',
                    type: 'text'
                  }, {
                    name: 'authorId',
                    type: 'int'
                  }, {
                    name: 'createdAt',
                    type: 'time',
                    isNullable: false,
                    "default": 'now()'
                  }, {
                    name: 'updatedAt',
                    type: 'time',
                    isNullable: false,
                    "default": 'now()'
                  }]
                }));
              case 2:
                return _context.abrupt("return", _context.sent);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function up(_x) {
        return _up.apply(this, arguments);
      }
      return up;
    }()
  }, {
    key: "down",
    value: function () {
      var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryRunner) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return queryRunner.dropTable('posts');
              case 2:
                return _context2.abrupt("return", _context2.sent);
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function down(_x2) {
        return _down.apply(this, arguments);
      }
      return down;
    }()
  }]);
  return CreatePosts1688608173903;
}();
exports.CreatePosts1688608173903 = CreatePosts1688608173903;