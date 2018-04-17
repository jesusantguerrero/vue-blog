const Pusher = require('pusher');
const { PUSHER_APP_KEY, PUSHER_APP_ID, PUSHER_APP_SECRET } = process.env;

const pusher = new Pusher({
	appId: PUSHER_APP_ID,
	key: PUSHER_APP_KEY,
	secret: PUSHER_APP_SECRET,
	cluster: 'us2',
	encrypted: true
});

module.exports = pusher