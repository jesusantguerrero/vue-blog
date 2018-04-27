<template>
	<div class="input-group">
		<input type="text" class="form-control" @keypress.enter="goToSearch" v-model="localSearch" placeholder="Search for...">
		<span class="input-group-btn">
			<button class="btn btn-secondary" type="button" @click.prevent="goToSearch">Go!</button>
		</span>
	</div>
</template>

<script>

export default {
	data() {
		const Search = this.getSearch();
		return {
			Search,
			localSearch: ''
		}
	},

	methods: {
		goToSearch() {
			this.saveSearch('text', this.localSearch)
			this.$router.push('/search'); 
		}
	}
}
</script>

