<template>
	<div class="row">
		<div class="col-md-8">
			<h1 class="my-4"> Search Posts
          <small> : filtering by "{{ search.text }}" </small> 
      </h1>
					<h4> Results ({{ posts.length}})</h4>
			<div class="search-bar d-flex justify-center" >
				<input type="text" class="form-control" v-model="search.text">
				<input type="date" class="form-control" title="start date" v-if="this.search.checks.date" v-model="search.date.start">
				<input type="date" class="form-control" title="end date" v-if="this.search.checks.date" v-model="search.date.end">
			</div>

			<div class="search-bar__controls d-flex justify-center">
				<div class="form-group form-check">
					<input type="checkbox" name="title" v-model="search.checks.title">
    			<label class="form-check-label" for="title">by Title</label>
 				</div>

				<div class="form-group form-check">
				<input type="checkbox" name="content" v-model="search.checks.content">
    			<label class="form-check-label" for="content">by Content</label>
 				</div>
				
				<div class="form-group form-check">
				<input type="checkbox" name="" id="" v-model="search.checks.author">
    			<label class="form-check-label" for="title">by Author(username)</label>
 				</div>
				
				<div class="form-group form-check">
					<input type="checkbox" name="date" v-model="search.checks.date">
    			<label class="form-check-label" for="title">by Date</label>
 				</div>
				 
			</div>
			<br>
			<div>
					<paginate ref="postTable"
						name="posts"
						:list="posts"
						:per="perPage">
						<post-card :key="post.id" v-for="post in paginated('posts')" :post="post" :origin="$route.path"></post-card>
					</paginate>
				<nav aria-label="Page navigation example">  
					<paginate-links for="posts" :async="true" :classes="paginateClass" @change="onPageChange"></paginate-links>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>
import PostCard from '../components/PostCard';

export default {
	components: {
		PostCard
	},
	data() {
		 const search = this.getSearch();
		return {
			search,
			posts: [],
			paginate: ['posts'],
			perPage: 25,
			paginateClass: {
				'ul': 'pagination',
				'li': 'page-item',
				'a': 'page-link'
			}
		}
	},

	watch: {
		search: {
			handler() {
				this.setSearch(this.search);
				setTimeout(() => {
					this.searchPosts();
				}, 1000);
			},
			deep: true
		},
		
	},

	mounted() {
		this.searchPosts();
	},

	methods: {
		searchPosts() {
			let params = Object.entries(this.search.checks);
			params = params.map((param) => {
				if (param[0] === 'author') {
					// search this locally
				} else if (param[0] !=='date' && param[1]) {
					return `${param[0]}_like=${this.search.text}&`;
				} else if (param[1]) {
					const start = this.search.date.start|| 0;
					const end = this.search.date.end || this.stampFormat(this.now())
					return `publishDate_gte=${start}&publishDate_lte=${end}&`
				}
			});

			// params = params.join('').replace('author', 'user.username')
			this.$http.get(`/posts?${params}isDeleted=false&isPublish=true&_sort=id&_order=desc&_expand=user&_embed=comments`)
				.then((res) => {
					this.posts = res.data.map((post) => {
						post.author = post.user;
						return post;
					});
					
					if (this.search.checks.author) {
						this.filterAuthor();
					}
					//  wait for paginate to render the list
					setTimeout(() => {
						const page = this.posts.length ? 1 : 0
						this.$refs.postTable.goToPage(this.search.page || page);
					}, 500);

				})
				.catch((err) => console.log(err));
		},

		onPageChange (toPage, fromPage) {
    	this.search.page = toPage;
  	},

		filterAuthor() {
			this.posts = this.posts.filter((post) => (post.author.username.indexOf(this.search.text) >= 0));
		}

	}
}
</script>


<style>
</style>