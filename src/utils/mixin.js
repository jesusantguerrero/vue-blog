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

		stampFormat(date) {
			return date.replace(/[-]/g, '');
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

		getSearch() {
			const Search = {
					text: '',
					date: {
						start: '',
						end: ''
					},
					checks: {
						title: true,
						author: false,
						content: false,
						date: false
					},
					page: 1
				}

			if (!sessionStorage.getItem('Search')) {
				this.setSearch(Search);
			}
			return JSON.parse(sessionStorage.getItem('Search'));
		},
		
		setSearch(Search) {
			sessionStorage.setItem('Search', JSON.stringify(Search))
		},

		saveSearch(key, value) {
			const Search = this.getSearch();
			Search[key] = value;
			this.setSearch(Search);
		},


	}
}