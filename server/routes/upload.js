const express = require('express');
const path = require('path');
const router = express.Router();
const fileUpload = require('express-fileupload');
const randtoken = require('rand-token');
const User = require('./../utils/user');

router.post('/upload', fileUpload(), async (req, res) => {
	if (!req.files) {
		return res.status(400).send('no files were uploaded')
	}

	const filepond = req.files.filepond;
	const user = req.user ? req.user : {};
	const dot = filepond.name.lastIndexOf('.')
	const filename = `/uploads/${user.id || 'default'}${filepond.name.slice(dot)}`;
	filepond.mv(path.resolve(__dirname,`../../public${filename}`), async (err) => {
		if(err) 
			return res.status(500).send(err);
			user.picture = `.${filename}`;		
			await User.save(user);
		res.end();
	})
})

router.post('/upload_froala', fileUpload(), (req, res) => {
	if (!req.files) {
		return res.status(400).send('no files were uploaded')
	}

	const filepond = req.files.froala;
	const filename = `/uploads/${randtoken.generate(16)}${filepond.name}`;
	filepond.mv(path.resolve(__dirname,`../../public${filename}`), (err) => {
		if(err) 
			return res.status(500).send(err);
		res.json({ link: `.${filename}`});
	})
})

module.exports = router;