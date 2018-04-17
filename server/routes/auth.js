const express = require('express');
const router = express.Router();
const axios = require('axios');
const randtoken = require('rand-token');
const Email = require('email-template');

router.post('/registration', async (req, res, next) => {
	const { email, username } = req.body;
	const userEmail = await axios.default.get(`/api/users?email=${email}`)
	const userName = await axios.default.get(`/api/users?username=${userName}`)
	console.log(userEmail)
	console.log(userName)

	if (userEmail || username) {
		res.send( { message: 'username or email is already taken'})
	} else {
		const user = req.body;
		user.validationToken = randtoken.generate(16);
		user.validationTokenTime = new Date().getTime();
		const validationLink = `${process.env.ROOT}/accounts/validation_token?=${randtoken}&user=${user.username}`;
		const emailer = new Email({
			message: {
				from: 'niftylettuce@gmail.com'
			},
			send: true,
			transport: {
				jsonTransport: true
			}
		});

		emailer
			.send({
				template: 'mars',
				message: {
					to: user.email
				},
				locals: {
					name: user.username
				}
			})
			.then(console.log)
			.catch(console.error);
	}
})

router.post('/confirmation', async (req, res, next) => {
	
})

module.exports = router