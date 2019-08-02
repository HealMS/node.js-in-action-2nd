//express是基于connect的, 实际上使用connect也可以开发
const connect = require('connect');
function logger(req, res, next) {
    console.log("%s %s", req.method, req.url);
    next();     //中间件必须要有调用next()否则后续中间件不会执行
}
function hello(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("hello world");
}

const app = connect()
            .use(logger)
            .use(hello)
            .listen(3000);