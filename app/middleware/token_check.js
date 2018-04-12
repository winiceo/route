
module.exports = options => {
    /*
     * 需要登录
     */
    return async function(ctx, next) {
        // 后续中间件执行完成后将响应体转换成 gzip
        const options = {};
        let token = '';

        if (ctx.request.headers.authorization) {
            const strToken = ctx.request.headers.authorization.split(' ');
            if (strToken.length === 2) {
                token = strToken[1];
            }
        } else {
            token = ctx.query.token || ctx.request.body.token || ctx.request.headers['x-token'];
        }

        options.token = token;
        let user = false;
        try {
            user = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
            console.log(token);
            console.log(user);
            if (user) {
                ctx.account = user;
            }
        } catch (e) {
            ctx.body = {
                status: 403,
                message: '认证失败，请重新登录'

            };
            console.log(e);
            return;
        }
        if (!user) {


            if (ctx.isXHR) {
                ctx.body = {
                    status: 403,
                    message: '认证失败，请重新登录'

                };
                return;
            }
        }

        await next();
    };
};
