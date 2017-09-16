var https = require('https');
var fs = require('fs');
var basedir = '/var/webkey/';

var options = {
	key: fs.readFileSync(basedir + 'server-key.pem'),
	ca: [fs.readFileSync(basedir + 'ca-cert.pem')],
	cert: fs.readFileSync(basedir + 'server-cert.pem')
};

https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
}).listen(433,'127.0.0.1');
