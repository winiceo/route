'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

var convert = require('data2xml')();
var validator = require('validator');

function utf8ForXml(inputStr) {
    // FIXME: no-control-regex
    /* eslint-disable no-control-regex */
    return inputStr.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, '');
}

var TestController = function (_Controller) {
    _inherits(TestController, _Controller);

    function TestController() {
        _classCallCheck(this, TestController);

        return _possibleConstructorReturn(this, (TestController.__proto__ || Object.getPrototypeOf(TestController)).apply(this, arguments));
    }

    _createClass(TestController, [{
        key: 'test',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var ctx, header, token, _app$jwt$verify, email;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                ctx = this.ctx;

                                console.log(this.ctx.header);
                                header = ctx.request.header;
                                token = header['authorization'];


                                console.log(token);
                                _app$jwt$verify = this.app.jwt.verify(token, this.app.config.jwt.secret), email = _app$jwt$verify.email;

                                console.log(email);

                                this.ctx.body = this.ctx.state.user;

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function test() {
                return _ref.apply(this, arguments);
            }

            return test;
        }()
    }]);

    return TestController;
}(Controller);

module.exports = TestController;
//# sourceMappingURL=test.js.map