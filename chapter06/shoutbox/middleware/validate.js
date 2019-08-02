//将entry[name]转化为 ["entry", "name"]
//res.send是express模块的函数，原生不支持
function parseField(field) {
    //split会得到["entry", "name", ""]需要filter过滤掉其中false的字段
    return field.split(/\[|\]/).filter(s => s);
}
function getField (req, field) {
    let val = req.body;
    field.forEach(prop => {
        val = val[prop];
    });
    return val;
}
exports.required = field => {
    field = parseField(field);
    return (req, res, next) => {
        if (getField(req, field)) {
            next();
        } else {
            console.log(`${field.join(' ')} is required`);
            //回退一步
            res.redirect('back');
        }
    };
};
exports.lengthAbove = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
        if (getField(req, field).length > len) {
            next();
        } else {
            console.log(`${field} must have more than ${len} characters`);
            res.redirect('back');
        }
    };
};