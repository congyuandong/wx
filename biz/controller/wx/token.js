"use strict";

const config = require('../../../conf').appConfig;
const crypto = require('crypto');
const tools = require('../../tools');
const parser = require('co-wechat-parser');

module.exports = function*() {
	if (this.method === 'GET') {
		var query = this.request.query;
		var timestamp = query.timestamp;
		var nonce = query.nonce;
		var echostr = query.echostr;

		var tmp = [config.token, timestamp, nonce].sort().join('');
		var signature = crypto.createHash('sha1').update(tmp).digest('hex');
		if (query.signature != signature) {
			this.body = 'Auth failed!'; // 指纹码不匹配时返回错误信息，禁止后面的消息接受及发送
		} else {
			this.body = echostr;
		}
	} else if (this.method === 'POST') {
		var body = yield parser.parse(this.req);
		//console.log(this.request.wx);
		//var body = tools.parseMessage(this);
		//var body = yield parse(this);
		//console.log(body);
		this.body = {
			fromUserName: body.tousername,
			FromUserName: body.fromusername,
			MsgType: "text",
			Content: body.content,
			CreateTime: body.createtime
		};
	}
};