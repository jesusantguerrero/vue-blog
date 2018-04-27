<template>
    <div class="row" v-if="me">
				<div class="col-md-4">
						<app-wigget title="">
								<router-link :to="authorLink"> <img class="d-flex mr-3 rounded-circle profile-picture" :src=" me.picture || 'http://placehold.it/50x50'" alt=""> </router-link>
								<h5 class="mt-0"> <router-link :to="authorLink"> {{ me.username }} </router-link> </h5>
						</app-wigget>

						<div>
							<app-wigget title="Menu">
									<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
										<TabLink ids="published-tab" classes="active" refs="#published" title="General"> </TabLink>
										<TabLink ids="liked-tab" refs="#liked" title="Profile"> </TabLink>
									</ul>
							</app-wigget>
						</div>
				</div>

        <div class="col-md-8">
						<app-wigget title="User Activity" ref="appWidget">
								<div class="tab-content" id="pills-tabContent">
									<TabPane ids="published" classes="show active" ref="panePublished">
										<UpdatePassword :require-old="true"></UpdatePassword>
									</TabPane>

									<TabPane ids="liked" classes="" ref="paneLiked">
										<Confirmation title="Update your Profile" :redirect="false"></Confirmation>
									</TabPane>
								</div>

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
	import TabLink from '../components/TabLink';
	import TabPane from '../components/TabPane';
	import Confirmation from './Confirmation';
	import UpdatePassword from './UpdatePassword';

	export default {
		components: {
			AppWigget,
			AppPagination,
			PostCard,
			Search,
			TabPane,
			TabLink,
			Confirmation,
			UpdatePassword
		},
		mounted() {
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
				return this.me.username;
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


			getUser() {
				const url = (this.param === 'userId') ? `/users/${this.username}` : `/users?username=${this.username}`;
				this.$http.get(url)
					.then(({ data }) => {
						this.user = (Array.isArray(data)) ? data[0] : data;
					})
			}
		}
	}
</script>

