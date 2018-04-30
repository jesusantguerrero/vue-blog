require('dotenv').config();
const express = require('express');
const jsonServer = require('json-server');
const app = express();
const path = require('path');
const mComments = require('./server/middlewares/mComment');
const authRouter = require('./server/routes/auth');
const PORT = process.env.PORT || 3000;
const jsonMiddlewares = jsonServer.defaults();
const router = jsonServer.router(path.resolve(__dirname, 'server/db/db.json'));
const session = require('express-session');
const passport = require('./server/utils/passport'); 
const fileUpload = require('express-fileupload');
const randtoken = require('rand-token');
const User = require('./server/utils/user');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(jsonMiddlewares)

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public','index.html'));
})

app.use(jsonServer.bodyParser);
app.use(session({ secret: 'vue-blog', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', authRouter)

app.post('/api/upload', fileUpload(), async (req, res) => {
	if (!req.files) {
		return res.status(400).send('no files were uploaded')
	}

	const filepond = req.files.filepond;
	const user = req.user ? req.user : {};
	const dot = filepond.name.lastIndexOf('.')
	const filename = `/uploads/${user.id || 'default'}${filepond.name.slice(dot)}`;
	filepond.mv(path.resolve(__dirname,`./public${filename}`), async (err) => {
		if(err) 
			return res.status(500).send(err);
			user.picture = `.${filename}`;		
			await User.save(user);
		res.end();
	})
})

app.use(mComments);
app.use('/api', router)

app.listen(PORT, () => {
	console.log(`listening port ${PORT}`);
})