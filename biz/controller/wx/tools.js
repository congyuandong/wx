'use strict';

const model = require('../../model');
const moment = require('moment');
const request = require('request');
const thunkify = require('thunkify');
const get = thunkify(request.get);

/**
 * 获取access token如果超时则更新
 *
 * @returns token <String>
 */
exports.getAccessToken = function*() {
	var tokenObj = yield model.bizHandler.queryToken();
	if (tokenObj.length) {
		tokenObj = tokenObj[0];
	} else {
		tokenObj = {
			expirs_in : -1,
			time : moment()
		};
		yield model.bizHandler.initToken();
	}
	var tokenTime = moment(tokenObj.time);
	console.log(moment().diff(tokenTime));
	if (moment().diff(tokenTime) > tokenObj.expirs_in * 1000) {
		return "需要更新token";
	} else {
		return tokenObj.access_token;
	}
}

/**
 * 类扩展工具函数
 *
 * @param obj
 * @param obj2
 * @returns {*}
 */
exports.extend = function(obj, obj2) {
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      obj[key] =obj2[key];
    }
  }

  return obj;
}

/**
 * 类扩展工具函数
 *
 * @param obj
 * @param obj2
 * @returns {*}
 */
exports.tuling = function*(content) {
	var url = 'http://www.tuling123.com/openapi/api?key=330fab4b41219e4327e69c0280b9ec4c&info='+content;
	var response = yield get(url);
	response = JSON.parse(response[0].body);
	if (response.code == 100000)
		return response.text;
	else 
		return '主人休息去了，我也懒得理你了~';
}