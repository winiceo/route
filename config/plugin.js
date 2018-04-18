/* eslint-disable quotes */
// had enabled by egg
// exports.static = true;

exports.static = true;
exports.security = {
    csrf: {
        enable: false
    }
};
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

exports.redis = {
    'enable': true,
    'package': 'egg-redis'
};

exports.alinode = {
    'enable': true,
    'package': 'egg-alinode',
    "env": ["prod"]
};

exports.validate = {
    'enable': true,
    'package': 'egg-validate'
};

exports.mysql = {
    'enable': true,
    'package': 'egg-mysql'
};


exports.sequelize = {
    enable: false,
    package: 'egg-sequelize'
};
exports.jwt = {
    enable: true,
    package: "egg-jwt"
};