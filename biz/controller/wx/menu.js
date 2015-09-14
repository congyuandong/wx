"use strict";

/**
*	设置微信菜单
*/

const tools = require('./tools');

module.exports = function*() {
	var accessToken = yield tools.getAccessToken();
	this.body = accessToken;
}