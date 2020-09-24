const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../mongoose/models/User");
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const log = require('../log');

passport.use('local-signup', new LocalStrategy(
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, true);
      } else {
        return done(null, false);
      }

    });
  }
));


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user || !user.checkPassword(password) || user.role == 'user_block') {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    })
    .catch(done);
}));

passport.use('facebook', new FacebookStrategy({
  clientID: config.get("facebook:clientId"),
  clientSecret: config.get("facebook:clientSecret"),
  callbackURL: config.get("facebook:callbackUrl"),
  profileFields: ['id', 'email', 'displayName']
},

  function (_, _, profile, done) {
    //console.log(profile);
    User.findOne({ 'facebookId': profile.id }, function (err, user) {
      if (err)
        return done(err);

      if (user) {
        return done(null, user);
      } else {
        let newUser = new User();
        newUser.facebookId = profile.id;
        newUser.username = profile.displayName;
        newUser.role = 'user';
        newUser.email = profile.emails[0].value;

        console.log("passport", newUser);

        newUser.save(function (err) {
          if (err)
            throw err;

          return done(null, newUser);
        });

      }
    });
  }));