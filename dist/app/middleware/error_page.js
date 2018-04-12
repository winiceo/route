'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var status = [404, 403];

module.exports = function () {
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            var message;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return next();

                        case 2:
                            if (!(status.indexOf(ctx.status) > -1 && !ctx.body)) {
                                _context.next = 11;
                                break;
                            }

                            message = ctx.message;

                            ctx.status = ctx.status;

                            if (!ctx.acceptJSON) {
                                _context.next = 9;
                                break;
                            }

                            ctx.body = { error: 'Not Found' };
                            _context.next = 11;
                            break;

                        case 9:
                            _context.next = 11;
                            return ctx.render('notify/notify', { error: message });

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function errorPage(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return errorPage;
    }();
};
//# sourceMappingURL=error_page.js.map