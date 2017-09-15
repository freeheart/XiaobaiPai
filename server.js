var http = require("http"),
    server = http.createServer(function(req, res) {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.write("xiao bai pai!");
        res.end();
    });
//监听80端口
server.listen(80);
console.log('xiaobaipai server started');
