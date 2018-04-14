<template>
    <div class="row">
        <div class="col-md-8">
            <h1 class="my-4"> Posts By
                <small> {{ authorName }} </small>
            </h1>

					<post-card :key="i" v-for="(post, i) in posts" :post="post" origin="home" :isFullContent="true"></post-card>
					<app-pagination></app-pagination>
        </div>

				<div class="col-md-4">
						<app-wigget title="Search">
							<search></search>
						</app-wigget>
						<app-wigget title="Nuevo Post">
							<router-link to='/new-post'> Nuevo Post </router-link>
						</app-wigget>
				</div>

    </div>
    
</template>

<script>
	import PostCard from '../components/PostCard';
	import AppWigget from '../components/AppWigget';
	import Search from '../components/Search';
	import AppPagination from '../components/AppPagination';
	import axios from 'axios';

	export default {
		components: {
			AppWigget,
			AppPagination,
			PostCard,
			Search
		},
		mounted() {
			this.getPosts();
		},
		data() {
			return {
				posts: [],
			}
		},
		computed: {
			authorName() {
				return (this.posts.length > 0) ? this.posts[0].author.alias: '' 
			}
		},
		methods: {
			getPosts() {
				this.$http.get(`/posts?author.username=${this.$route.params.username}&isDeleted=false&isPublish=true&_sort=id&_order=desc&_embed=comments`)
				.then((res) => {
					this.posts = res.data
				})
			}
		}
	}
</script>

