<template>
    <div class="row">
				<div class="col-md-4">
						<app-wigget title="">
								<router-link :to="authorLink"> <img class="d-flex mr-3 rounded-circle profile-picture" :src=" user.picture || 'http://placehold.it/50x50'" alt=""> </router-link>
								<h5 class="mt-0"> <router-link :to="authorLink"> {{ user.username }} </router-link> </h5>
						</app-wigget>

						<div v-if="!user.isPrivate">
							<app-wigget title="Personal Info">
								<p>Name: {{ user.name }}</p>
								<p>lastname: {{ user.lastname }}</p>
								<h4>Description: </h4> 
								<p>{{ user.description }}</p>
							</app-wigget>
						</div>
				</div>

        <div class="col-md-8">
						<app-wigget v-if="user.isPrivate">
							<h3> This profile is private </h3>
						</app-wigget>

						<app-wigget title="User Activity" ref="appWidget" v-if="!user.isPrivate">
								
								<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
									<TabLink ids="published-tab" classes="active" refs="#published" :title="`Published (${posts.length})`"> </TabLink>
									<TabLink ids="commented-tab" refs="#commented" :title="`commented (${commented.length})`"> </TabLink>
									<TabLink ids="liked-tab" refs="#liked" :title="`Liked (${liked.length})`"> </TabLink>
								</ul>

								<div class="tab-content" id="pills-tabContent">
									<TabPane ids="published" classes="show active" ref="panePublished">
											<paginate
												name="posts"
												:list="posts"
												:per="perPage"
												:container="this"
											>
												<post-card :key="post.id" v-for="post in paginated('posts')" :post="post" :origin="$route.path"></post-card>
											</paginate>
											<nav aria-label="Page navigation example">  
												<paginate-links for="posts" :async="true" :classes="paginateClass" :container="{
													state: paginate.posts,
													el: $refs.panePublished
												}"></paginate-links>
										</nav>
									</TabPane>

									<TabPane ids="commented" classes="" ref="paneCommented">
										<paginate
												name="commented"
												:list="commented"
												:per="perPage"
												:container="this"
											>
												<post-card :key="commented.id" v-for="commented in paginated('commented')" :post="commented" :origin="$route.path"></post-card>
											</paginate>
											<nav aria-label="Page navigation example">  
												<paginate-links for="commented" :async="true" :classes="paginateClass" :container="{
													state: paginate.commented,
													el: $refs.paneCommented
												}"></paginate-links>
										</nav>
									</TabPane>

									<TabPane ids="liked" classes="" ref="paneLiked">
											<paginate
												name="liked"
												:list="liked"
												:per="perPage"
												:container="this"
											>
												<post-card :key="liked.id" v-for="liked in paginated('liked')" :post="liked" :origin="$route.path"></post-card>
											</paginate>
											<nav aria-label="Page navigation example">  
												<paginate-links for="liked" :async="true" :classes="paginateClass" :container="{
													state: paginate.liked,
													el: $refs.paneLiked
												}"></paginate-links>
										</nav>
									</TabPane>
								</div>

							</app-wigget>
						</div>
        </div>
    </div>
    
</template>

<script>
	import PostCard from '../components/PostCard';
	import AppWigget from '../components/AppWigget';
	import Search from '../components/Search';
	import AppPagination from '../components/AppPagination';
	import axios from 'axios';
	import TabLink from '../components/TabLink';
	import TabPane from '../components/TabPane';

	export default {
		components: {
			AppWigget,
			AppPagination,
			PostCard,
			Search,
			TabPane,
			TabLink
		},
		mounted() {
			this.defineParams();
			this.getUser();
		},
		data() {
			return {
				posts: [],
				liked: [],
				commented: [],
				paginate: ['posts', 'liked', 'commented'],
				perPage: 25,
				param: '',
				username: '',
				user: '',
				paginateClass: {
					'ul': 'pagination',
					'li': 'page-item',
					'a': 'page-link'
				}
			}
		},
		computed: {
			authorName() {
				return this.user.username;
			},

			authorLink() {
				return `/author/${this.authorName}`;
			}
		},
		methods: {
			defineParams() {
				this.username = this.$route.params.username;
				this.param = (this.username && /\d/.test(this.username)) ? 'userId' : 'user.username';
			},

			getLiked() {
				this.$http.get(`/posts?likes_like=${this.user.id}&_sort=id&_order=desc&_embed=comments&_expand=user`)
				.then(({ data }) => {
					this.liked = data.map((post) => {
						post.author = post.user;
						return post;
					})
				})
			},

			getPublished() {
				this.$http.get(`/posts?userId=${this.user.id}&isDeleted=false&isPublish=true&_sort=id&_order=desc&_embed=comments&_expand=user`)
				.then(({ data }) => {
					this.posts = data.map((post) => {
						post.author = post.user;
						return post;
					})
				})
			},

			getCommented() {
				this.$http.get(`/comments?userId=${this.user.id}&_sort=id&_order=desc&_expand=post&_embed=comments&_expand=user`)
				.then(({ data }) => {
					data.forEach((comment) => {
						if (!this.commented.includes(comment.post)) {
							this.commented.push(comment.post)
						}
					})
				})
			},

			getPosts() {
				this.getPublished();
				this.getCommented();
				this.getLiked();
			},

			getUser() {
				const url = (this.param === 'userId') ? `/users/${this.username}` : `/users?username=${this.username}`;
				this.$http.get(url)
					.then(({ data }) => {
						this.user = (Array.isArray(data)) ? data[0] : data;
						this.getPosts();
					})
			}
		}
	}
</script>

