//展示表单页面，用于提交留言
const Entry = require('../models/entry');
exports.form = (req, res) => {
    res.render('post', {title: 'Post'});
};
exports.submit = (req, res, next) => {
    //表单中entry[title],entry[body]会被body-parser转换为{ entry: { title: 'Hello', body: 'World' } }
    const { title, body } = req.body.entry;
    const user = res.local.user;
    const username = user ? user.name : null;
    const entry = new Entry({
        username,
        title,
        body 
    });
    entry.save(err => {
        if (err) return next(err);
        res.redirect('/');
    });
};
exports.list = (req, res, next) => {
    Entry.getRange(0, -1, (err, entries) => {
        if (err) return next(err);
        res.render('entries', {
            title: entries.title, 
            entries
        });
    });
};