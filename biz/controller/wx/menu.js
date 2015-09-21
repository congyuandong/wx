"use strict";

const urllib = require('urllib');

/**
 *	设置微信菜单
 */

const tools = require('./tools');

module.exports = function*() {
	var accessToken = yield tools.getAccessToken();

	var url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + accessToken;

	var menu = {
		"button": [{
			"type": "scancode_waitmsg",
			"name": "扫码查询",
			"key": "scan"
		}, {
			"type": "click",
			"name": "我是旺财",
			"key": "ww"
		}, {
			"type": "click",
			"name": "说点啥吧",
			"key": "say"
		}]
	};

	var response = yield urllib.requestThunk(url, {
		method: 'POST',
		data: menu
	});

	response = JSON.parse(response.data);

	console.log(response);

	this.body = accessToken;
}