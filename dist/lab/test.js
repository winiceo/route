'use strict';

var AipSpeech = require("baidu-aip-sdk").speech;
var fs = require('fs');

// 务必替换百度云控制台中新建百度语音应用的 Api Key 和 Secret Key
var client = new AipSpeech(11080468, '7D7nGR27gdpwhsroGohql617', '4372759c23ebae5b1797eeefba18f655');

client.text2audio('    深圳市必盈信息技术有限公司成立于2017年1月，是一家区块链技术创新的公司，企业在上海、深圳、香港等地设有办公室，现有团队成员50余人，是区块链技术应用和数字资产管理公司，专注于区块链解决方案、加密数字资产管理、交易与风控技术方案；\n' + '\n' + '    公司参与运营路印协议的推广并获得良好社区口碑。旗下智子基金，拥有管理经验丰富的技术人才，致力于打造安全、公平、公开的数字资产管理及投融资。').then(function (result) {
    if (result.data) {
        fs.writeFileSync('tts.mpVoice.mp3', result.data);
    } else {
        // 服务发生错误
        console.log(result);
    }
}, function (e) {
    // 发生网络错误
    console.log(e);
});
//# sourceMappingURL=test.js.map