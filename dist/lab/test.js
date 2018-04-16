'use strict';

// let AipSpeech = require("baidu-aip-sdk").speech;
// let fs = require('fs');
//
// // 务必替换百度云控制台中新建百度语音应用的 Api Key 和 Secret Key
// let client = new AipSpeech(11080468, '7D7nGR27gdpwhsroGohql617', '4372759c23ebae5b1797eeefba18f655');
//
//
//
// client.text2audio('    深圳市必盈信息技术有限公司成立于2017年1月，是一家区块链技术创新的公司，企业在上海、深圳、香港等地设有办公室，现有团队成员50余人，是区块链技术应用和数字资产管理公司，专注于区块链解决方案、加密数字资产管理、交易与风控技术方案；\n' +
//     '\n' +
//     '    公司参与运营路印协议的推广并获得良好社区口碑。旗下智子基金，拥有管理经验丰富的技术人才，致力于打造安全、公平、公开的数字资产管理及投融资。').then(function(result) {
//     if (result.data) {
//         fs.writeFileSync('tts.mpVoice.mp3', result.data);
//     } else {
//         // 服务发生错误
//         console.log(result)
//     }
// }, function(e) {
//     // 发生网络错误
//     console.log(e)
// });

var _ = require('lodash');
var fetch = require('node-fetch');
// or
// const fetch = require('node-fetch');

// if you are using your own Promise library, set it through fetch.Promise. Eg.

// import Bluebird from 'bluebird';
// fetch.Promise = Bluebird;

// plain text or html


var download = require('image-downloader');

// json
var con = [];
fetch('https://res.maka.im/user/5367838/event/WYMOS1D1/WYMOS1D1_v41.json?v=2').then(function (res) {
    return res.json();
}).then(function (json) {

    var data = json.data.pdata.json;
    _(data).forEach(function (m) {
        _(m.content).forEach(function (n) {
            if (n.picid) {
                con.push(n.picid);

                download.image({
                    url: 'http://img1.maka.im/' + n.picid,
                    dest: 'images' // Save to /path/to/dest/image.jpg
                }).then(function (_ref) {
                    var filename = _ref.filename,
                        image = _ref.image;

                    console.log('File saved to', filename);
                }).catch(function (err) {
                    throw err;
                });
            }
        });
    });
});
//# sourceMappingURL=test.js.map