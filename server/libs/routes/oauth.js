var express = require('express');
var router = express.Router();
const passport = require('passport');
const log = require('../log');
const config = require('../config');

router.get('/login/facebook', passport.authenticate('facebook', { scope: 'email', session: false }));

router.get('/login/facebook/callback', (req, res, next) =>
    passport.authenticate('facebook', {
        session: false
    }, (err, user) => {

        if (err) {
            return next(err);
        }

        if (user) {
            const params = user.toAuthJSON();

            return res.redirect(`${config.get("hostClient")}/user/${params.id}?username=${params.username}&token=${params.token}`);
        }

        return res.status(400);
    })(req, res, next)
);

router.get('/signup/facebook', passport.authenticate('facebook', { scope: 'email', session: false }));

router.get('/signup/facebook/callback', (req, res, next) =>
    passport.authenticate('facebook', {
        session: false
    }, (err, user) => {
        if (err) {
            return next(err);
        }

        if (user) {
            log.info()
            return res.json(user.toAuthJSON());
        }

        return res.status(400);
    })(req, res, next)
);

module.exports = router;