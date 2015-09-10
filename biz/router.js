"use strict";

const router = require('koa-router')();

const home = require('./controller/home');
const token = require('./controller/wx/token');

module.exports = function(app) {
	
	router.get('/',home);
	router.get('/token',token);

	app.use(router.routes());
};