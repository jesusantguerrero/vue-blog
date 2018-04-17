const express = require('express');
const router = express.Router();
const axios = require('axios');
const randtoken = require('rand-token');
const Email = require('email-templates');
const transporter = require('./../utils/nodemailer');
const User = require('./../utils/user');
const passport = require('./../utils/passport');

router.post('/registration', async (req, res, next) => {
	const { email, username } = req.body;
	const foundByEmail = await User.findUser('email', email);
	const foundByUsername = await User.findUser('username', username);
	
	if (foundByEmail || foundByUsername) {
		res.status(404).json( { message: 'username or email is already taken'})
	} else {
		const user = req.body;
		user.password = await User.hash(user.password);
		sendEmailConfirmation(user)
		res.json({ ok: true });		
	}

})

router.post('/validation', async (req, res, next) => {
	const credentials = req.body;
	const user = await User.findUser('email', credentials.email);

	if (credentials.email == user.email && user.validationToken == credentials.token && isValidTokenTime(user.validationTokenTime)) {
		user.isActive = true;
		axios.default.put(`${process.env.ROOT}/api/users/${user.id}}`, user)
		res.json({ ok: true });
		return
	} 
	res.status(404).json( { message: 'is not a valid token or the token has expired'})
})

router.post('/send_confirmation', async (req, res, next) => {
	const credentials = req.body;
	const user = await User.findUser('email', credentials.email);
	if (user) {
		sendEmailConfirmation(user);
		res.json({ ok : true})		
	} else {
		res.status(404).json({ message: 'is not a valid email'})
	}
})

router.post('/reset_password', (req, res, next) => {
	// TODO
})

router.post('/login', passport.authenticate('local')
);

router.get('/auth/logout',(req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/me', (req, res) => {
	res.json(req.user)
});

function sendEmailConfirmation(user, isCreated = false) {
	user.validationToken = randtoken.generate(16);
	user.validationTokenTime = new Date().getTime();
	const validationLink = `${process.env.ROOT}/#/account/validation/${user.validationToken}/${user.email}`;

	const emailer = new Email({
		message: {
			from: 'jesusant@mctekk.com'
		},
		send: true,
		transport: transporter
	});

	if (isCreated) {
		axios.default.put(`${process.env.ROOT}/api/users/${user.id}`, user)
	} else {
		axios.default.post(`${process.env.ROOT}/api/users`, user)
			.then((user) => console.log(user))
			.catch((err) => console.log(err))		
	}

	emailer
		.send({
			template: 'welcome',
			message: {
				to: user.email
			},
			locals: {
				name: user.email,
				link: validationLink,
			}
		})
		.then((email) => console.log())
		.catch((err) => console.error(err.data));
}

function isValidTokenTime(tokenTime) {
	const now = new Date().getTime();
	const timePassed = now - tokenTime;
	if (timePassed / (1000 * 60 * 60) >= 2) {
		return true;
	}
}

module.exports = router