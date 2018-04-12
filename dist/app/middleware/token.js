'use strict';

/**
 * Created by leven on 17/2/20.
 */

module.exports = function (options, app) {
    return (/*#__PURE__*/regeneratorRuntime.mark(function checkid(next) {
            var options, token, strToken, user;
            return regeneratorRuntime.wrap(function checkid$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            // 后续中间件执行完成后将响应体转换成 gzip
                            options = {};
                            token = '';

                            if (this.request.headers.authorization) {
                                strToken = this.request.headers.authorization.split(' ');

                                if (strToken.length === 2) {
                                    token = strToken[1];
                                }
                            } else {
                                token = this.query.token || this.request.body.token || this.request.headers['x-token'];
                            }
                            // if(!token){
                            //     token=this.cookies
                            // }
                            options.token = token;

                            // console.log(token)

                            user = false;

                            try {
                                user = app.jwt.verify(token, app.config.jwt.secret);
                                // console.log(user)
                                if (user) {
                                    this.user = user;
                                }
                            } catch (e) {}

                            if (user) {
                                _context.next = 10;
                                break;
                            }

                            if (!this.isXHR) {
                                _context.next = 10;
                                break;
                            }

                            this.body = {
                                status: 403,
                                message: '认证失败，请重新登录'

                            };
                            return _context.abrupt('return');

                        case 10:
                            _context.next = 12;
                            return next;

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, checkid, this);
        })
    );
};
//# sourceMappingURL=token_check.js.map