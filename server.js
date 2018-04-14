const express = require('express');
const jsonServer = require('json-server');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.resolve(__dirname, 'server/db/db.json')); 

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(middlewares);
//app.use(authMiddleware)

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public','index.html'))
})

app.use('/api', router)

app.listen(PORT, () => {
	console.log(`listening port ${PORT}`);
} )
