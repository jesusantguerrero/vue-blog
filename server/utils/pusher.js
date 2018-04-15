const Pusher = require('pusher');

const pusher = new Pusher({
	appId: '509678',
	key: '21afd18b9a96f017b4a4',
	secret: 'fb27b24b44360f829156',
	cluster: 'us2',
	encrypted: true
});

pusher.port = 443;

module.exports = pusher