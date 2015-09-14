"use strict";

const router = require('koa-router')();

const home = require('./controller/home');
const token = require('./controller/wx/token');
const menu = require('./controller/wx/menu');

module.exports = function(app) {
	
	router.get('/',home);
	router.get('/token',token);
	router.get('/setmenu',menu);

	router.post('/token',token);

	app.use(router.routes());
};