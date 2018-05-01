require('dotenv').config();
const express = require('express');
const jsonServer = require('json-server');
const app = express();
const path = require('path');
const mComments = require('./server/middlewares/mComment');
const authRouter = require('./server/routes/auth');
const uploadRouter = require('./server/routes/upload');
const PORT = process.env.PORT || 3000;
const jsonMiddlewares = jsonServer.defaults();
const router = jsonServer.router(path.resolve(__dirname, 'server/db/db.json'));
const session = require('express-session');
const passport = require('./server/utils/passport'); 

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

app.use('/api', uploadRouter)

app.use(mComments);
app.use('/api', router)

app.listen(PORT, () => {
	console.log(`listening port ${PORT}`);
})