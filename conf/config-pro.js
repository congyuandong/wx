module.exports = {
	"env": "pro",
	"port": 12000,

	//db config
	dbPool: {
        host : 'rdss79ww4c8m44ep2rgq.mysql.rds.aliyuncs.com',
        port : 3306,
        user : 'aliyun_mysql',
        password : 'aliyun_dbpwd',
        database : 'wechat',
        debug : false,
        waitForConnections : true,
        connectionLimit : 10,
        connectTimeout : 5000
    },

	"token":"congyuandong",
	"appid":"wx688beea849774414",
	"secret":"77e11d7b461925cb7ec9ebf6de26446d",
    "tuling":"330fab4b41219e4327e69c0280b9ec4c"
};