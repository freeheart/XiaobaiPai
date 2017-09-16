var express = require('express');
var app = express();
var router = express.Router();
var https = require('https');

var fs = require('fs');
var basedir = '/var/webkey/';

var options = {
	key: fs.readFileSync(basedir + 'server-key.pem','utf8'),
	ca: [fs.readFileSync(basedir + 'ca-cert.pem','utf8')],
	cert: fs.readFileSync(basedir + 'server-cert.pem','utf8')
};

//登录拦截器
app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && !req.session.user) {
        return res.redirect("/login");
    }
    next();
});
// 处理区域
router.post('/', function(req, res, next) {
  res.render('index', { title: 'POST' });
});

//启动HTTPS服务
https.createServer(options, app).listen(443);
