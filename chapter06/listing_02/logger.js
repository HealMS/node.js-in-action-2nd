function setup(format) {
    const regexp = /:(\w+)/g;
    return function createLogger(req, res, next) {
        //全局匹配会执行循环, 最后将返回值替换format
        const str = format.replace(regexp, (match, property) => {
            return req[property];
        });
        console.log(str);
        next();
    };
}

module.exports = setup;