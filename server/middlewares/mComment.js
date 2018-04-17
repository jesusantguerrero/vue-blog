const pusher = require('./../utils/pusher');

module.exports = commentMiddleware

function commentMiddleware (req, res, next) {
  if ((req.method === 'POST' || req.method === 'PATCH') && req.path.includes('comments')) {
		const { mentions } = req.body;
		const { method } = req;
		const message = (method === 'POST') ? 'new comment': 'updated comment'
		if (mentions) {
			pusher.trigger('comments', 'new-mention', {
				mentions,
				comment: req.body,
				message
			});
		}
	}
	
	next()
}
