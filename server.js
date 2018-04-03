const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public','index.html'))
})

app.get('api/', (req, res) => {
	res.end('Hello World');
})

app.listen(PORT, () => {
	console.log(`listening port ${PORT}`);
} )
