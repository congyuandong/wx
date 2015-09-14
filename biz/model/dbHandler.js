"use strict";
var Promise = require('bluebird');

exports.query = function (pool, sql, condition) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, condition, function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};