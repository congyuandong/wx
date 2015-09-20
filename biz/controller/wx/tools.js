'use strict';

const config = require('../../../conf').appConfig;
const model = require('../../model');
const moment = require('moment');
const urllib = require('urllib');

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
	//console.log(moment().diff(tokenTime));
	if (moment().diff(tokenTime) > tokenObj.expirs_in * 1000) {
		var url = 'https://api.weixin.qq.com/cgi-bin/token';
		var data = {
			'grant_type': 'client_credential',
			'appid': config.appid,
			'secret': config.secret
		}
		var response = yield urllib.requestThunk(url,{
			method: 'GET',
			data: data
		});
		response = JSON.parse(response.data);
		yield model.bizHandler.updateToken(tokenObj.id, response.access_token, response.expires_in);
		return response.access_token;
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
exports.tuling = function*(content, userid) {
	var url = 'http://www.tuling123.com/openapi/api';
	var data = {
		'key': config.tuling,
		'info': content,
		'userid': userid
	}
	var response = yield urllib.requestThunk(url,{
		method: 'GET',
		data: data
	});
	response = JSON.parse(response.data);
	if (response.code == 100000)
		return response.text;
	else 
		return '主人休息去了，我也懒得理你了~';
}
