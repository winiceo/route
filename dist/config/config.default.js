'use strict';

var path = require('path');

module.exports = function (appInfo) {
    var config = {};

    config.name = 'BeeRoute Api';
    // debug 为 true 时，用于本地调试
    config.debug = false;

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1519887194138_3450';

    config.host = 'http://cnodejs.org';

    config.session_secret = 'beelet_secret'; // 务必修改

    // add your config here
    config.middleware = ['locals', 'authUser', 'blockUser', 'errorPage'];

    config.authUser = {
        'enable': true,
        'match': '/'
    };

    // 是否允许直接注册（否则只能走 github 的方式）
    config.allow_sign_up = true;

    // cdn host，如 http://cnodejs.qiniudn.com
    config.site_static_host = process.env.EGG_SITE_STATIC_HOST || ''; // 静态文件存储域名

    config.mini_assets = process.env.EGG_MINI_ASSETS || false;

    // 文件上传配置
    // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
    config.upload = {
        'path': path.join(__dirname, '../app/public/upload/'),
        'url': '/public/upload/'
    };

    config.view = {
        'defaultViewEngine': 'ejs',
        'mapping': {
            '.html': 'ejs'
        }
    };

    config.ejs = {
        'layout': 'layout.html'
    };

    config.auth_cookie_name = 'bee_route';
    config.admins = {
        'ADMIN_USER': true
    };

    config.siteFile = {
        '/favicon.ico': '/public/images/cnode_icon_32.png'
    };

    config.static = {
        prefix: '/',
        maxAge: 31536000,
        dir: [path.join(appInfo.baseDir, 'public/')]
    };

    // database
    config.redis = {
        'client': {
            'host': process.env.EGG_REDIS_HOST || '127.0.0.1',
            'port': process.env.EGG_REDIS_PORT || 6379,
            'password': process.env.EGG_REDIS_PASSWORD || '',
            'db': process.env.EGG_REDIS_DB || '0'
        }
    };

    /**
     * @see http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html#createCollection
     */
    config.mongoose = {
        'url': process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/egg_cnode',
        'options': {
            'server': { 'poolSize': 20 }
        }
    };

    // passport
    config.passportGithub = {
        'key': process.env.EGG_PASSPORT_GITHUB_CLIENT_ID || 'test',
        'secret': process.env.EGG_PASSPORT_GITHUB_CLIENT_SECRET || 'test'
    };

    config.passportLocal = {
        'usernameField': 'name',
        'passwordField': 'pass'
    };

    // 邮箱配置
    config.mail_opts = {
        'host': 'smtp.sendgrid.net',
        'port': 25,
        'auth': {
            'user': 'koinotice@gmail.com',
            'pass': 'T861pW7vp_qp7w.izWe4Eh4Hqoa4Y9fVG'
        },
        'ignoreTLS': true
    };
    config.mail_grid_opts = {
        auth: {
            api_user: 'apikey',
            api_key: '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'
        }
    };

    config.alinode = {
        // 从 `Node.js 性能平台` 获取对应的接入参数
        'appid': process.env.EGG_ALINODE_APPID || '13173',
        'secret': process.env.EGG_ALINODE_SECRET || '83cd543a57e7639aa623784a02a37acd5fb00a9f'
    };

    config.topic = {
        'perDayPerUserLimitCount': 10
    };

    config.list_topic_count = 20;

    // 每个 IP 每天可创建用户数
    config.create_user_per_ip = 1000;

    config.search = 'google'; // 'google', 'baidu', 'local'

    config.security = {
        csrf: {
            enable: false
        }
    };
    // config/config.${env}.js
    config.mysql = {
        // 单数据库信息配置
        'client': {
            // host
            'host': 'localhost',
            // 端口号
            'port': '3306',
            // 用户名
            'user': 'root',
            // 密码
            'password': '',
            // 数据库名
            'database': 'route'
        },
        // 是否加载到 app 上，默认开启
        'app': true,
        // 是否加载到 agent 上，默认关闭
        'agent': false
    };

    config.jwt = {
        secret: 'DwNgD85L2Rc9',
        option: {
            expiresIn: '360d'
        }
    };

    return config;
};
//# sourceMappingURL=config.default.js.map