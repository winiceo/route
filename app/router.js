
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middleware } = app;

    const {
        account, balance, wallet, miner, email, test, home
    } = controller;

    const apipre = '/api';

    const tokenCheck = middleware.tokenCheck();

    router.redirect('/', '/docs', 302);

    router.get('/docs', home.docs);// 用户登录


    /**
     * 用户相关
     */
    router.post(apipre + '/account/login', account.login);// 用户登录
    router.post(apipre + '/account/register', account.register);// 用户注册
    router.post(apipre + '/account/forget', account.forget);// 修改密码
    router.post(apipre + '/account/changePassword', tokenCheck, account.updatePass);// 修改密码
    router.post(apipre + '/account/balances', tokenCheck, balance.total);// 修改密码


    /**
     * 钱包相关
     */
    router.post(apipre + '/wallet/assets', tokenCheck, wallet.assets);
    router.post(apipre + '/wallet/withdraw', tokenCheck, wallet.withdraw);
    router.post(apipre + '/wallet/withdraw/history', tokenCheck, wallet.withdrawHistory);


    /**
     * miner相关
     */
    router.post(apipre + '/miner', tokenCheck, miner.index);
    router.post(apipre + '/miner/:miner_id', tokenCheck, miner.detail);

    /**
     * 邮箱相关
     */
    router.post(apipre + '/email/captcha', email.sendCaptcha);

    /**
     * 测试相关
     */
    router.post('/test', tokenCheck, test.test);

};
