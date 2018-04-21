const pusher = require('./../utils/pusher');
const User = require('../utils/user');

module.exports = commentMiddleware

async function commentMiddleware (req, res, next) {
  if ((req.method === 'POST' || req.method === 'PATCH') && req.path.includes('comments')) {
		const comment = req.body
		const { mentions } = comment;
		const { method } = req;
		const author = await User.find('id', comment.userId).username;
		console.log(author)
		const message = (method === 'POST') ? 'new comment': 'updated comment'
		if (mentions && mentions.length) {
			pusher.trigger('comments', 'new-mention', {
				mentions,
				comment,
				message,
				author
			});
		}
	}
	
	next()
}
