const User = require('./models/user');
const user = new User({name: 'denis', pass: 'test'});
user.save(err => {
    if (err) console.error(err);
    console.log('user id %d', user.id);
});

User.getByName('denis', (err, user) => {
    console.log(user);
});