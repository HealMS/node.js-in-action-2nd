/**
 * 串行化流程
 */
const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const { resolve } = require('path');
const configFilename = resolve(__dirname, './rss_feeds.txt');
//检查文件存在
function checkForRSSFile() {
    fs.exists(configFilename, (exists) => {
        if (!exists) {
            return next(new Error(`Missing RSS file: ${configFilename}`));
        }
        next(null, configFilename);
    })
}
//读取文件中RSS订阅源
function readRSSFile(configFilename) {
    fs.readFile(configFilename, (err, feedList) => {
        if (err) {
            return next(err)
        }
        //buffer -> string -> 去空格 —> 数组
        feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
        const random = Math.floor(Math.random() * feedList.length);
        next(null, feedList[random]);
    });
}
//下载html内容
function downloadRSSFeed(feedUrl) {
    request(feedUrl, (err, res, body) => {
        if (err) return next(err);
        if (res.statusCode !== 200) {
            return next(new Error("Abnormal response status code"));
        }
        next(null, body);
    });
}
//解析html内容成JSON对象
function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length) {
        return next(new Error("No RSS items found"));
    }
    const item = handler.dom.item.shift();
    console.log(item.title);
    console.log(item.link);
}
const tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];

function next(err, result) {
    if (err) throw err;
    const currentTask = tasks.shift();
    if (currentTask) {
        currentTask(result);
    }
}
next();