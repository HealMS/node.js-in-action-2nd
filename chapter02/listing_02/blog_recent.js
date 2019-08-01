const http = require('http');
const fs = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');
const readFile = promisify(fs.readFile);

http.createServer((req, res) => {
    if (req.url === '/') {
        Promise.all([readFile(resolve(__dirname, './titles.json')), readFile(resolve(__dirname, './template.html'))])
            .then(result => {
                let [titles, template] = result; //文件读取的结果是buffer，需要toStirng()
                titles = JSON.parse(titles.toString());
                template = template.toString();
                const html = template.replace('%', titles.join("</li><li>"));
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            }).catch(err => {
                console.error(err);
                res.end("Server Error");
            });
    }
}).listen(8000, '127.0.0.1', () => {
    console.log("server running at '127.0.0.1:8000'");
});