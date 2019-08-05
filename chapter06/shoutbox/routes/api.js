const auth = require('basic-auth');
const User = require('../models/user');
const Entry = require('../models/entry');
/** 通过Authentication认证设置req.remoteUser */
exports.auth = (req, res, next) => {
    const { name, pass } = auth(req);
    User.authenticate(name, pass, (err, user) => {
        if (user) req.remoteUser = user;
        next(err);
    });
};
/** 获取用户信息 */
exports.user = (req, res, next) => {
    User.get(req.params.id, (err, user) => {
        if (err) return next(err);
        console.log(req.sessionID);  //访问sessionID
        if (!user.id) res.sendStatus(404);
        res.json(user);
    });
};
/** 获取留言 可指定page */
exports.entries = (req, res, next) => {
    const page = req.page;
    Entry.getRange(page.from, page.to, (err, entries) => {
        if (err) return next(err);
        /** res.format会根据Accept字段返回客户端想要的数据格式 */
        res.format({
            'application/json': () => {
                res.send(entries);
            },
            'application/xml': () => {
                res.render('entries/xml', { entries });
            }
        });
    });
};