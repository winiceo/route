'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (options, app) {

  console.log(app.config);
  /*
   * 需要登录
   */
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var options, token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 后续中间件执行完成后将响应体转换成 gzip
              options = {};
              token = '';

              // console.log(app.config);

              console.log(ctx.config);

              // if (ctx.request.headers.authorization) {
              //     const strToken = ctx.request.headers.authorization.split(' ');
              //     if (strToken.length === 2) {
              //         token = strToken[1];
              //     }
              // } else {
              //     token = ctx.query.token || ctx.request.body.token || ctx.request.headers['x-token'];
              // }
              // // if(!token){
              // //     token=ctx.cookies
              // // }
              // options.token = token;
              //
              // console.log(token);
              //
              //
              // let user = false;
              // try {
              //     user = app.jwt.verify(token, app.config.jwt.secret);
              //     console.log(user);
              //     if (user) {
              //         ctx.user = user;
              //     }
              // } catch (e) {
              //     console.log(e);
              // }
              // if (!user) {
              //     console.log(4444);
              //
              //     if (ctx.isXHR) {
              //         ctx.body = {
              //             status: 403,
              //             message: '认证失败，请重新登录'
              //
              //         };
              //         return;
              //     }
              // }
              // console.log(333);
              _context.next = 5;
              return next();

            case 5:
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
//# sourceMappingURL=token_check3.js.map