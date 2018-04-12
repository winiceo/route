'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {

    /*
    * 需要登录
    */
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(!ctx.user || !ctx.user._id)) {
                                _context.next = 4;
                                break;
                            }

                            ctx.status = 403;
                            ctx.body = 'forbidden!';
                            return _context.abrupt('return');

                        case 4:
                            _context.next = 6;
                            return next();

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};
//# sourceMappingURL=user_required.js.map