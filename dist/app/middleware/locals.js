'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Loader = require('loader');

module.exports = function (options, app) {
    // assets
    var assets = {};
    var logger = app.logger;

    if (app.config.mini_assets) {
        try {
            assets = require('../assets.json');
        } catch (e) {
            logger.error('You must execute `make build` before start app when mini_assets is true.');
            throw e;
        }
    }

    // 验证用户是否登录
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            ctx.locals.config = app.config;
                            ctx.locals.Loader = Loader;
                            ctx.locals.assets = assets;
                            ctx.locals.csrf = ctx.csrf;
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

// app.use(errorPageMiddleware.errorPage);
// _.extend(app.locals, require('./common/render_helper'));
// app.use(function (req, res, next) {
//   res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
//   next();
// });
//# sourceMappingURL=locals.js.map