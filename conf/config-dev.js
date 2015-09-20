module.exports = {
	"env": "dev",
	"port": 12000,

	//db config
	dbPool: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : '123',
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