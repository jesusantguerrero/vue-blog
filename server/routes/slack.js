const express = require('express');
const router = express.Router();


router.post('/order',(req, res) => {
	console.log(req.params);
	res.json({message : 'ok'})
})

router.post('/test', (req, res) => {
	console.log(req.params);
	res.json({message : 'ok'})
})

router.get('/order',(req, res) => {
	console.log(req.params);
	res.json({message : 'ok'})
})

router.get('/test', (req, res) => {
	console.log(req.params);
	res.json({message : 'ok'})
})

module.exports = router;