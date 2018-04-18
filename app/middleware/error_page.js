
const status = [404, 403];

module.exports = () => {
    return async function errorPage(ctx, next) {
        await next();
        if ((status.indexOf(ctx.status) > -1) && !ctx.body) {

            ctx.status = ctx.status;

            ctx.body = { status: 500, message: 'Not Found' };

        }
    };
};
