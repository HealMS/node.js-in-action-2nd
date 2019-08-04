const redis = require('redis');
const db = redis.createClient();
const saltRound = 10;
class User {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }
    save(cb) {
        if (this.id) {
            this.update(cb);
        } else {
            db.incr('user:ids', (err, id) => {
                if (err) return cb(err);
                this.id = id;  //设置id
                this.hashPassword(err => {  //设置加盐密码
                    if (err) return cb(err);
                    this.update(cb);  //设置完密码在回调中向数据库插入数据
                });
            });
        }
    }
    update(cb) {
        const id = this.id;
        db.set(`user:id:${this.name}`, id, err => {
            if (err) return cb(err);
            db.hmset(`user:${id}`, this, err => cb(err));
        });
    }
    hashPassword(cb) {
        bcrypt.genSalt(saltRound, (err, salt) => {
            if (err) return cb(err);
            this.salt = salt;
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) cb(err);
                this.pass = hash;
                cb();
            })
        })
    }
}

module.exports = User;