var https = require('https');
var fs = require('fs');
var basedir = '/var/webkey/';

var options = {
	key: fs.readFileSync(basedir + 'server-key.pem'),
	ca: [fs.readFileSync(basedir + 'ca-cert.pem')],
	cert: fs.readFileSync(basedir + 'server-cert.pem')
};
//登录拦截器
app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && !req.session.user) {
        return res.redirect("/login");
    }
    next();
});
//启动HTTPS服务
https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
}).listen(433,'127.0.0.1');
