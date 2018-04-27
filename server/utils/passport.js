const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');

passport.use(new LocalStrategy({
	usernameField: 'email'
	},

  async function(username, password, done) {
		const user = await User.find('email', username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
			} else if (!User.validatePassword(user.password, password)) {
				console.log('bad')
				return done(null, false, { message: 'Incorrect password.' });
      } else {
				console.log('correct')
				return done(null, user);
			}
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
	user = await User.find('id', id)
  done(null, User.forSession(user));
});

module.exports = passport;