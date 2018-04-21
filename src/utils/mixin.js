export default {
	data() {
		return {
			currentUser: null
		}
	},

	computed: {
		isLogged() {
			return this.$root.currentUser;
		},

		me() {
			return this.$root.currentUser;
		}
	},

	methods: {
		formatDate(date) {
			return date.toJSON().slice(0, 10);
		},

		now() {
			return this.formatDate(new Date());
		},

		getAuthor() {
			return this.me.id;
		},

		isAuthor(id) {
			const { currentUser } = this.$root;
			return (currentUser && currentUser.id == id);
		},

		setCurrentUser(user) {
			this.$root.currentUser = user || null;
		},

		getCurrentUser() {
			return this.$root.currentUser;
		},

		userLink() {
			return `/author/${this.$root.currentUser.username}`;
		},
	}
}