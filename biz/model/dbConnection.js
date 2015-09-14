"use strict";

const mysql = require('mysql');
const config = require('../../conf').appConfig;

exports.createPool = function (){
  var dbSetting = config.dbPool;
  return mysql.createPool(dbSetting);
};