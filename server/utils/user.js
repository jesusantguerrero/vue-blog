const axios = require('axios').default;
const bcrypt = require('bcrypt-nodejs');

module.exports = class User {
	static async findUser (field, value) {
		const foundUser = await axios.get(`${process.env.ROOT}/api/users?${field}=${value}`)
		.then(({ data }) => data)
		.catch((err) => console.log(err))
	
		return (foundUser.length > 0 ) ? foundUser[0] : null;
	}

	static async hash(password) {
		return bcrypt.hash(password, 10);
	}

	static async validatePassword(hash, password) {
		return await bcrypt.compare(password, hash);
	}

	static forSession(user) {
		delete user.password;
		delete user.validationToken;
		delete user.validationTokenTime;
		return user;
	}

}