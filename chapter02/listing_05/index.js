/**
 * 并行化流程
 */
const fs = require('fs');
const { resolve } = require('path');
const tasks = [];
const wordCounts = {};
const fileDir = resolve(__dirname, './text');
let completedTasks = 0;

function checkIfComplete() {
    completedTasks++;
    if (completedTasks === tasks.length) {
        for (let index in wordCounts) {
            console.log(`${index}: ${wordCounts[index]}`);
        }
    }
}
//读取文件
fs.readdir(fileDir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        const task = (file => {
            return () => {
                fs.readFile(file, (err, data) => {
                    if (err) throw err;
                    countWordsInText(data);  //计数
                    checkIfComplete();  //检查是否完成
                });
            };
        })(resolve(fileDir, file));
        tasks.push(task);
    });
    tasks.forEach(task => task());
});
//计数
function countWordsInText(text) {
    const words = text.toString().toLowerCase().split(/\W+/);
    words.forEach(word => addWordCount(word));
}
function addWordCount(word) {
    wordCounts[word] = wordCounts[word] ? (wordCounts[word]+1) : 1;
}