const express = require('express');
const passport = require('passport');
const router = express.Router();

// const db = require('../mongoose/mongoose');
const log = require('../log')(module);
const User = require('../mongoose/models/User');


router.get('/', function (req, res) {

    const result = User.find({}, {
        _id: 1,
        username: 1,
        email: 1,
        role: 1,
        avatar: ''
    });

    result.then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.get('/user/:id', function (req, res) {
    User.findOne({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.put('/user/role', function (req, res) {
    User.updateOne({ _id: req.body._id }, { $set: { role: req.body.role } })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.put('/user/password', function (req, res) {
    User.findById(req.body._id, function (err, user) { user.password = req.body.password; user.save(); })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
    /*
    User.updateOne({ _id: req.body._id }, { $set: { password: req.body.password} })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));*/
});

router.put('/user', function (req, res) {
    User.updateOne({ _id: req.body._id }, { $set: { username: req.body.username, email: req.body.email, avatar : req.body.avatar } })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.delete('/user', function (req, res) {
    log.info(`User delete with id: ${req.body.data._id}`);
    User.findOne({ _id: req.body.data._id })
        .deleteOne()
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});



router.post('/signup', function (req, res) {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });

    user.save(function (err) {
        if (!err) {
            log.info(`New user created with id: ${user.userId}`);
            return res.json(user.toAuthJSON());
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error(`Internal error(${res.statusCode}): ${err.message}`);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
});



router.post('/login', (req, res, next) =>
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }

        if (user) {
            log.info(`User login with id: ${user.userId}`);
            return res.json(user.toAuthJSON());
        }

        return res.status(400);
    })(req, res, next));


module.exports = router;