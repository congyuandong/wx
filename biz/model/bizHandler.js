"use strict";

var db = require('./dbHandler.js');
var dbPool = {};

exports.dbPoolInit = function (app) {
  dbPool = app.dbPool;
};

exports.queryToken = function (account_id, id) {
  var sql = 'select expirs_in, time, access_token from token limit 1';
  return db.query(dbPool, sql);
};

exports.initToken = function (tokenObj) {
  var sql = 'insert into token (expirs_in, time, access_token) values (?, now(), ?)';
  return db.query(dbPool, sql, [-1, '']);
}