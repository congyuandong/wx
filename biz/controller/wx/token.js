"use strict";

const config = require('../../../conf').appConfig;
const crypto = require('crypto');
const parser = require('co-wechat-parser');
const ejs = require('ejs');
const fs = require('fs');
const tools = require('./tools');

const messageTpl = fs.readFileSync(__dirname + '/message.ejs', 'utf-8');

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

		var reply = {
			toUserName: body.fromusername,
			fromUserName: body.tousername,
			createTime: new Date().getTime()
		};
		var data = {
			content: body.content,
			msgType: 'text'
		}
		var result = ejs.render(messageTpl, tools.extend(reply, data));
		this.body = result;
	}
};