'use strict';

/* eslint-disable quotes */
// had enabled by egg
// exports.static = true;

exports.static = true;
exports.security = {
    csrf: {
        enable: false
    }
};

exports.ejs = {
    'enable': true,
    'package': 'egg-view-ejs'
};

exports.redis = {
    'enable': true,
    'package': 'egg-redis'
};

exports.mongoose = {
    'enable': true,
    'package': 'egg-mongoose'
};

exports.passport = {
    'enable': true,
    'package': 'egg-passport'
};

exports.passportGithub = {
    'enable': true,
    'package': 'egg-passport-github'
};

exports.passportLocal = {
    'enable': true,
    'package': 'egg-passport-local'
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
exports.jwt = {
    enable: true,
    package: "egg-jwt"
};
//# sourceMappingURL=plugin.js.map