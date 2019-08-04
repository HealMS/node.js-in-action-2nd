function message(req) {
    return (msg, type) => {
        type = type || "info";
        const sess = req.session;
        sess.messages = sess.messages || [];
        sess.messages.push({type, string: msg});
    };
}

module.exports = (req, res, next) => {
    res.message = message(req);
    res.error = msg => {
        return res.message(msg, 'error');
    };
    res.locals.messages = res.session.messages || [];
    res.locals.removeMessages = () => {
        res.session.messages = [];
    };
    next();
};