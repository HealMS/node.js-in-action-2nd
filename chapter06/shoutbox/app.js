var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var session = require('express-session');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entries = require('./routes/entries');
var validate = require('./middleware/validate');
var register = require('./routes/register');
var messages = require('./middleware/message');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //模板文件夹
app.set('view engine', 'ejs');  //模板类型

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  //要处理表单时置为true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //静态文件夹
// session
app.use(methodOverride());
app.use(session({
  secret: 'secret', //签名, 与sessionId一起哈希加密
  resave: false,  //是否每次都重新保存会话, 建议设置为false
  saveUninitialized: true,  //是否自动保存未初始化的会话
}));
app.use(messages);

if (app.get('env') === 'development') {
    app.use(errorHandler());
}
app.set("json spaces", 2);

app.get('/', entries.list);
app.use('/users', usersRouter);
app.get('/post', entries.form);  //一般路由参数就是路径和路由处理函数, 但是中间实际上可以加入校验的中间件

app.post('/post', validate.required('entry[title]'), validate.lengthAbove('entry[title]', 4), entries.submit);
app.get('/register', register.form);
app.post('/register', register.submit);
app.post('/post', 
        validate.required('entry[title]'), 
        validate.lengthAbove('entry[title]', 4), 
        entries.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
