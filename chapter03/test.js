const read = require('node-readability');
const url = "http://www.bilibili.com";

read(url, (err, result) => {
    if (err) console.log(err);
    console.log(result);
});