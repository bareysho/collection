const mongoose = require('mongoose');
const log = require('../log')(module);
const config = require('../config');

console.log("connect ", config.get('mongooseUri'))
// console.log(process.env)
console.log(config.get());
mongoose.connect(config.get('mongooseUri'), { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

db.once('open', function callback() {
    log.info("Connected to DB!");
});

module.exports = mongoose;