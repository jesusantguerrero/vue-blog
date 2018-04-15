const express = require('express');
const jsonServer = require('json-server');
const app = express();
const path = require('path');
const mComments = require('./server/middlewares/mComment');
const PORT = process.env.PORT || 3000;
const jsonMiddlewares = jsonServer.defaults();
const router = jsonServer.router(path.resolve(__dirname, 'server/db/db.json')); 

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(jsonMiddlewares)

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public','index.html'))
})

app.use(jsonServer.bodyParser)
app.use(mComments);
app.use('/api', router)

app.listen(PORT, () => {
	console.log(`listening port ${PORT}`);
} )
