'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (app) {
    if (app.config.debug) {
        app.config.coreMiddleware.unshift('less');
    }

    var localHandler = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, _ref) {
            var username = _ref.username,
                password = _ref.password;
            var getUser, existUser, passhash, equal;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            getUser = function getUser(username) {
                                if (username.indexOf('@') > 0) {
                                    return ctx.service.user.getUserByMail(username);
                                }
                                return ctx.service.user.getUserByLoginName(username);
                            };

                            _context.next = 3;
                            return getUser(username);

                        case 3:
                            existUser = _context.sent;

                            if (existUser) {
                                _context.next = 6;
                                break;
                            }

                            return _context.abrupt('return', null);

                        case 6:
                            passhash = existUser.pass;
                            // TODO: change to async compare

                            equal = ctx.helper.bcompare(password, passhash);
                            // 密码不匹配

                            if (equal) {
                                _context.next = 10;
                                break;
                            }

                            return _context.abrupt('return', null);

                        case 10:
                            if (existUser.active) {
                                _context.next = 12;
                                break;
                            }

                            return _context.abrupt('return', null);

                        case 12:
                            return _context.abrupt('return', existUser);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function localHandler(_x, _x2) {
            return _ref2.apply(this, arguments);
        };
    }();

    var githubHandler = function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, _ref3) {
            var profile = _ref3.profile;
            var email, existUser, err;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            email = profile.emails && profile.emails[0] && profile.emails[0].value;
                            _context2.next = 3;
                            return ctx.service.user.getUserByGithubId(profile.id);

                        case 3:
                            existUser = _context2.sent;


                            // 用户不存在则创建
                            if (!existUser) {
                                existUser = new ctx.model.User();
                                existUser.githubId = profile.id;
                                existUser.active = true;
                            }

                            // 用户存在，更新字段
                            existUser.loginname = profile.username;
                            existUser.email = email || existUser.email;
                            existUser.avatar = profile._json.avatar_url;
                            existUser.githubUsername = profile.username;
                            existUser.githubAccessToken = profile.accessToken;

                            _context2.prev = 10;
                            _context2.next = 13;
                            return existUser.save();

                        case 13:
                            _context2.next = 28;
                            break;

                        case 15:
                            _context2.prev = 15;
                            _context2.t0 = _context2['catch'](10);

                            if (!(_context2.t0.message.indexOf('duplicate key error') !== -1)) {
                                _context2.next = 27;
                                break;
                            }

                            err = void 0;

                            if (!(_context2.t0.message.indexOf('email') !== -1)) {
                                _context2.next = 23;
                                break;
                            }

                            err = new Error('您 GitHub 账号的 Email 与之前在 CNodejs 注册的用户名重复了');
                            err.code = 'duplicate_email';
                            throw err;

                        case 23:
                            if (!(_context2.t0.message.indexOf('loginname') !== -1)) {
                                _context2.next = 27;
                                break;
                            }

                            err = new Error('您 GitHub 账号的用户名与之前在 CNodejs 注册的用户名重复了');
                            err.code = 'duplicate_loginname';
                            throw err;

                        case 27:
                            throw _context2.t0;

                        case 28:
                            return _context2.abrupt('return', existUser);

                        case 29:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[10, 15]]);
        }));

        return function githubHandler(_x3, _x4) {
            return _ref4.apply(this, arguments);
        };
    }();

    app.passport.verify(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, user) {
            var handler, existUser, auth_token, opts;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            ctx.logger.debug('passport.verify', user);
                            handler = user.provider === 'github' ? githubHandler : localHandler;
                            _context3.next = 4;
                            return handler(ctx, user);

                        case 4:
                            existUser = _context3.sent;

                            if (existUser) {
                                // id存入Cookie, 用于验证过期.
                                auth_token = existUser._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔

                                opts = {
                                    path: '/',
                                    maxAge: 1000 * 60 * 60 * 24 * 30,
                                    signed: true,
                                    httpOnly: true
                                };

                                ctx.cookies.set(app.config.auth_cookie_name, auth_token, opts); // cookie 有效期30天
                            }

                            return _context3.abrupt('return', existUser);

                        case 7:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x5, _x6) {
            return _ref5.apply(this, arguments);
        };
    }());

    app.passport.deserializeUser(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, user) {
            var auth_token, auth, user_id;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (!user) {
                                _context4.next = 12;
                                break;
                            }

                            auth_token = ctx.cookies.get(ctx.app.config.auth_cookie_name, {
                                signed: true
                            });

                            if (auth_token) {
                                _context4.next = 4;
                                break;
                            }

                            return _context4.abrupt('return', user);

                        case 4:
                            auth = auth_token.split('$$$$');
                            user_id = auth[0];
                            _context4.next = 8;
                            return ctx.service.user.getUserById(user_id);

                        case 8:
                            user = _context4.sent;

                            if (user) {
                                _context4.next = 11;
                                break;
                            }

                            return _context4.abrupt('return', user);

                        case 11:

                            if (ctx.app.config.admins.hasOwnProperty(user.loginname)) {
                                user.is_admin = true;
                            }

                        case 12:
                            return _context4.abrupt('return', user);

                        case 13:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function (_x7, _x8) {
            return _ref6.apply(this, arguments);
        };
    }());
};
//# sourceMappingURL=app.js.map