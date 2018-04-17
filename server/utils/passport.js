const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');

passport.use(new LocalStrategy({
	usernameField: 'email'
	},
  async function(username, password, done) {
		const user = await User.findUser('email', username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
			}
			
			console.log('user')
			console.log(user);
			console.log('validation')
			console.log(User.validatePassword(user.password, password))
      if (!User.validatePassword(user.password, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
	user = await User.findUser('id', id)
		delete user.password;
		delete user.validationToken;
		delete user.validationTokenTime;
    done(null, user);
});

module.exports = passport;