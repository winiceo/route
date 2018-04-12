'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (options) {
    /*
     * 需要登录
     */
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            var options, token, strToken, user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            // 后续中间件执行完成后将响应体转换成 gzip
                            options = {};
                            token = '';


                            if (ctx.request.headers.authorization) {
                                strToken = ctx.request.headers.authorization.split(' ');

                                if (strToken.length === 2) {
                                    token = strToken[1];
                                }
                            } else {
                                token = ctx.query.token || ctx.request.body.token || ctx.request.headers['x-token'];
                            }

                            options.token = token;
                            user = false;
                            _context.prev = 5;

                            user = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
                            console.log(token);
                            console.log(user);
                            if (user) {
                                ctx.account = user;
                            }
                            _context.next = 17;
                            break;

                        case 12:
                            _context.prev = 12;
                            _context.t0 = _context['catch'](5);

                            ctx.body = {
                                status: 403,
                                message: '认证失败，请重新登录'

                            };
                            console.log(_context.t0);
                            return _context.abrupt('return');

                        case 17:
                            if (user) {
                                _context.next = 21;
                                break;
                            }

                            if (!ctx.isXHR) {
                                _context.next = 21;
                                break;
                            }

                            ctx.body = {
                                status: 403,
                                message: '认证失败，请重新登录'

                            };
                            return _context.abrupt('return');

                        case 21:
                            _context.next = 23;
                            return next();

                        case 23:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[5, 12]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};
//# sourceMappingURL=token_check.js.map