<template>
    <div class="row">
        <div class="col-md-8">
            <h1 class="my-4"> Page Heading
                <small> Subheading</small>
            </h1>

					<post-card :key="i" v-for="(post, i) in posts" :post="post" origin="/home"></post-card>
        </div>

				<div class="col-md-4">
						<app-wigget title="Search">
							<search></search>
						</app-wigget>
						<app-wigget title="Nuevo Post" v-if="isLogged">
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
		methods: {
			getPosts() {
				this.$http.get('/posts?isDeleted=false&isPublish=true&_sort=id&_order=desc&_embed=comments&_expand=user')
				.then((res) => {
					this.posts = res.data.map((post) => {
						post.author = post.user;
						return post;
					})
				})
				.catch((err) => console.log(err));
			}
		}
	}
</script>

