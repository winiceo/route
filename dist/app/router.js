'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = function (app) {
  var router = app.router,
      controller = app.controller,
      middleware = app.middleware;
  var account = controller.account,
      balance = controller.balance,
      wallet = controller.wallet,
      miner = controller.miner,
      email = controller.email,
      test = controller.test,
      home = controller.home;


  var tokenCheck = middleware.tokenCheck();

  router.redirect('/', '/docs', 302);

  router.get('/docs', home.docs); // 用户登录


  /**
   * 用户相关
   */
  router.post('/account/login', account.login); // 用户登录
  router.post('/account/register', account.register); // 用户注册
  router.post('/account/forget', account.forget); // 修改密码
  router.post('/account/changePassword', tokenCheck, account.updatePass); // 修改密码
  router.post('/account/balances', tokenCheck, balance.total); // 修改密码


  /**
   * 钱包相关
   */
  router.post('/wallet/assets', tokenCheck, wallet.assets);
  router.post('/wallet/withdraw', tokenCheck, wallet.withdraw);
  router.post('/wallet/withdraw/history', tokenCheck, wallet.withdrawHistory);

  /**
   * miner相关
   */
  router.post('/miner', tokenCheck, miner.index);
  router.post('/miner/:miner_id', tokenCheck, miner.detail);

  /**
   * 邮箱相关
   */
  router.post('/email/captcha', email.sendCaptcha);

  /**
   * 测试相关
   */
  router.post('/test', tokenCheck, test.test);
};
//# sourceMappingURL=router.js.map