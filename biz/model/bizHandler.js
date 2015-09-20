"use strict";

var db = require('./dbHandler.js');
var dbPool = {};

exports.dbPoolInit = function (app) {
	dbPool = app.dbPool;
};

exports.queryToken = function (account_id, id) {
	var sql = 'select id, expirs_in, time, access_token from token limit 1';
	return db.query(dbPool, sql);
};

exports.updateToken = function (id, access_token, expirs_in) {
	var sql = 'update token set access_token = ?, expirs_in = ?, time = now() where id = ?';
	return db.query(dbPool, sql, [access_token, expirs_in, id]);
};

exports.initToken = function (tokenObj) {
	var sql = 'insert into token (expirs_in, time, access_token) values (?, now(), ?)';
	return db.query(dbPool, sql, [-1, '']);
}