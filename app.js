"use strict";
const path = require('path');
const koa = require('koa');
const koastatic = require('koa-static');
const view = require('koa-views'); // 模板解析
const router = require('./biz/router');
const model = require('./biz/model');

const app = koa();
const config = require('./conf').appConfig;

/* error handler */
app.use(function* errorHandler(next) {
	try {
		yield next;
	} catch (e) {
		// TODO 记录日志
		console.error(e.stack);
		if (config.env === 'dev') {
			console.error('error');
			this.body = e.stack;
		} else {
			this.body = 'server error';
		}
	}
});

/* static server */
app.use(koastatic(path.resolve(__dirname, './static')));

/* template engine */
var dust = require('dustjs-helpers');
dust.config.whitespace = true; // 不压缩html代码
app.use(view('biz/templates', {
	default: 'dust'
}));

/* route */
router(app);

app.listen(config.port, function() {
	console.log('server started on:', config.port);

	//initialize Database
	app.dbPool = model.dbConnection.createPool();

	//initialize dbHandler dbPool
	model.bizHandler.dbPoolInit(app);
});