const env = process.env.NODE_ENV || 'development';

function errorHandler(err, req, res, next) {
    res.statusCode = 500;
    switch (env) {
        case 'development': 
            console.error("Error:", err);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(err));
            break;
        default:
            res.send("Server error");
    }
}

module.exports = errorHandler;