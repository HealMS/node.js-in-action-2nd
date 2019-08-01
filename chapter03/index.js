const express = require('express');
const bodyParser = require('body-parser');
// const Article = require('./models/db');
const read = require('node-readability');
const app = express();

app.set('port', process.env.port || 3000);
app.use(bodyParser.json());  //接受请求体json数据
app.use(bodyParser.urlencoded({ extended: true}));  //接受表单数据,记得传参数
app.use('css/bootstrap', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        //format会根据req.accepted来判断返回什么形式的响应内容
        res.format({
            html: res.render('article.ejs', {articles}),
            json: res.send(articles)
        });
    });
});
app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    read(url, (err, result) => {
        if (err || !result) {
            res.status(500).send("Error downloading article");
        }
        const {title, content} = result;
        Article.create({title, content}, (err, article) => {
            if (err) return next(err);
            res.send("OK");
        });
    });
});
app.get('/articles/:id', (req, res, next) => {
    const id = req.param.id;
    console.log('Fetch:', id);
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    })
});
app.delete('/articles/:id', (req, res, next) => {
    const id = req.param.id;
    console.log('Deleting:', id);
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({message: 'Deleted'});
    });
});

app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
});

module.exports = app;