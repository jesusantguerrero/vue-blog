const axios = require('axios').default;
const bcrypt = require('bcrypt-nodejs');

module.exports = class User {
	static async find (field, value) {
		const foundUser = await axios.get(`${process.env.ROOT}/api/users?${field}=${value}`)
		.then(({ data }) => data)
		.catch((err) => console.log(err))
	
		return (foundUser.length > 0 ) ? foundUser[0] : null;
	}

	static async save(user) {
		const isUser = await this.find('email', user.email);
		const url = (isUser) ? `${process.env.ROOT}/api/users/${user.id}` : `${process.env.ROOT}/api/users`;
		const method = (isUser) ? 'patch' : 'post';
		axios[method](url, user)
			.then((user) => console.log('user  or updated'))
			.catch((err) => console.log(err));		
	}

	static hash(password) {
		return bcrypt.hashSync(password);
	}

	static async validatePassword(hash, password) {
		return  bcrypt.compareSync(password, hash);
	}

	static forSession(user) {
		delete user.password;
		delete user.validationToken;
		delete user.validationTokenTime;
		return user;
	}
}