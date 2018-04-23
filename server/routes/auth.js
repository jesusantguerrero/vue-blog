const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const randtoken = require('rand-token');
const Email = require('email-templates');
const transporter = require('./../utils/nodemailer');
const User = require('./../utils/user');
const passport = require('./../utils/passport');

router.post('/registration', async (req, res, next) => {
	const { email, username } = req.body;
	const foundByEmail = await User.find('email', email);
	const foundByUsername = await User.find('username', username);
	
	if (foundByEmail || foundByUsername) {
		let message = (foundByEmail) ? 'Email is' : 'Username is';
		if (foundByEmail && foundByUsername) {
			message = 'user and email are';
		}
		res.statusMessage = `${message} already taken`; 
		res.status(400).end();
	} else {
		const user = req.body;
		user.alias = user.username;
		user.password = User.hash(user.password);
		sendEmailConfirmation(user)
		res.status(200).json({ ok: true });		
	}

})

router.post('/validation', async (req, res, next) => {
	const credentials = req.body;
	const user = await User.find('email', credentials.email);
	if (credentials.email == user.email && user.validationToken == credentials.token && isValidTokenTime(user.validationTokenTime)) {
		user.isActive = true;
		axios.put(`${process.env.ROOT}/api/users/${user.id}`, user);
		req.login(user,  function(err) {
			if (err) { return next(err); }
			return true
		});
		res.status(200).json({ ok: true });
		res.end()
	} else {
		res.statusMessage = 'is not a valid token or the token has expired';
		res.status(404).end();

	}
})

router.post('/send_confirmation', async (req, res, next) => {
	const credentials = req.body;
	const user = await User.find('email', credentials.email);
	if (user) {
		sendEmailConfirmation(user, true);
		res.json(User.forSession(user))		
	} else {
		res.statusMessage = 'is not a valid email';
 		res.status(400).end();
	}
})

router.post('/reset_password', (req, res, next) => {
	// TODO
})

router.post('/update_profile/:id', async (req, res, next) => {
	const { body } = req;
	const user = await User.findById(req.params.id);

	user.username = body.username;
	user.name = body.name;
	user.lastname = body.lastname;
	user.description = body.description;
	user.alias = body.alias;
	user.picture = body.picture;
	user.isPrivate =  body.isPrivate;
	user.validationToken = '';
	user.tokenTime = null;

	User.save(user)
		.then((user) => {
			res.json(User.forSession(user));
		})
		.catch((err) => console.log(err))
})

router.post('/update_password', async (req, res) => {
	const { body } = req;
	const user = await User.findById(req.user.id);

	if (!req.user) {
		res.statusMessage = 'You are not logged In';
		res.status(400).end();
	} else if (!User.validatePassword(user.password, body.oldPassword)) {

		res.statusMessage = 'The old password is wrong';
		res.status(400).end();
	} else {
			user.password = User.hash(body.password);
			User.save(user)
			.then((user) => {
				res.redirect('/api/auth/logout');
			})
			.catch((err) => console.log(err))
	}
})

router.post('/login', 
passport.authenticate('local'), (req, res) => {
	res.json(req.user)
}
);

router.get('/logout',(req, res) => {
	req.logout();
  res.redirect('/');
})

router.get('/me', (req, res) => {
	res.json(req.user)
});

function sendEmailConfirmation(user, isCreated = false) {
	user.validationToken = randtoken.generate(16);
	user.validationTokenTime = new Date().getTime();

	const url = (isCreated) ? `${process.env.ROOT}/api/users/${user.id}` : `${process.env.ROOT}/api/users`;
	const method = (isCreated) ? 'patch' : 'post';
	
	axios[method](url, user)
	.then(({data}) => {
		console.log(data)
		const user = data;
		const validationLink = `${process.env.ROOT}/#/account/validation/${user.validationToken}/${user.email}`;
		sendEmail(user.email, validationLink);
	})
	.catch((err) => console.log('Error de post', err));

}

function isValidTokenTime(tokenTime) {
	const now = new Date().getTime();
	const timePassed = now - tokenTime;
	const hours = timePassed / (1000 * 60 * 60) ;
	console.log(hours);
	if (hours <= 2) {
		return true;
	}
	return false;
}

function sendEmail(email, link, template = 'welcome') {
	
	const emailer = new Email({
		message: {
			from: 'jesusant@mctekk.com'
		},
		send: true,
		transport: transporter
	});

	emailer
	.send({
		template: template,
		message: {
			to: email
		},
		locals: {
			name: email,
			link,
		}
	})
	.then((email) => console.log('message sent'))
	.catch((err) => console.error(err.data));
}



module.exports = router