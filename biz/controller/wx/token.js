"use strict";

const config = require('../../../conf').appConfig;
const crypto = require('crypto');

module.exports = function*() {

	var timestamp = this.params.timestamp;
	var nonce = this.params.nonce;
	var echostr = this.params.echostr;

	var tmp = [config.token, timestamp, nonce].sort().join('');
	var signature = crypto.createHash('sha1').update(tmp).digest('hex');
	if (this.params.signature != signature) {
		this.body = 'Auth failed!'; // 指纹码不匹配时返回错误信息，禁止后面的消息接受及发送
	} else {
		this.body = echostr;
	}

};