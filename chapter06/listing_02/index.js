/**
 * 安装cross-env在windows下设置NODE_ENV
 */
const connect = require('connect');
const logger = require('./logger');
const error = require('./error');

function hello (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("hello world");
}

const app = connect()
            .use(logger(':method :url'))
            .use(hello)
            .use(error)
            .listen(3000);