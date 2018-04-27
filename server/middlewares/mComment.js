const pusher = require('./../utils/pusher');
const User = require('../utils/user');
const axios = require('axios').default;
module.exports = commentMiddleware

async function commentMiddleware (req, res, next) {
  if ((req.method === 'POST' || req.method === 'PATCH') && req.path.includes('comments')) {
		const comment = req.body
		let { mentions } = comment;
		const { method } = req;
		const author = await User.findById(comment.userId);

		if (method === 'PATCH') {
			const oldComment = await axios.get(`${process.env.ROOT}/api/comments/${comment.id}`).then(({data}) => data).catch((err) => console.log(err));
			mentions = mentions.filter((mention) => (!oldComment.mentions.includes(mention)));
		}

		if (mentions && mentions.length) {
			pusher.trigger('comments', 'new-mention', {
				mentions,
				comment,
				author
			});
		}
	}
	
	next()
}