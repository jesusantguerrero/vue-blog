export default {
	methods: {
		formatDate(date) {
			return date.toJSON().slice(0, 10);
		},

		now() {
			return this.formatDate(new Date());
		}
	}
}