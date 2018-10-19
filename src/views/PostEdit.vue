<template>
	<div class="">
		<h1 class="my-4"> Edit Your Post: {{ post.title }} </h1>
		<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
			<TabLink ids="edit-post-tab" classes="active" refs="#edit-post" title="Edit Post"> </TabLink>
			<TabLink ids="view-post-tab" refs="#view-post" title="Preview Post"> </TabLink>
		</ul>

		<div class="tab-content" id="pills-tabContent">
			 <TabPane ids="edit-post" classes="show active">
					<form>
						<div class="form-group">
							<input type="text" class="form-control" placeholder="The Title" v-model="post.title">
						</div>
				
						<comment-form btnSaveText="Update" @saved="updatePost" @canceled="backToHome" @input="onInput" :model="post.content">
							<!-- extra controls -->
				
							<div class="extra-controls-container">
								<br>
								<div class="form-group">
				
									<div class="form-check">
										<input class="form-check-input" type="checkbox" id="can-comment" v-model="post.canComment">
										<label class="form-check-label" for="can-comment"> Allow Comments </label>
									</div>

									<div class="form-check">
										<input class="form-check-input" type="checkbox" id="defaultCheck1" v-model="post.isPublish">
										<label class="form-check-label" for="publish"> Public </label>
									</div>
				
								</div>
							</div>

							<template slot="actions-before">
								<button class="btn btn-danger" @click="deletePost"> Eliminar </button>
							</template>

							<template slot="actions-after">
								<button class="btn btn-primary" @click="publishPost"> Publish </button>
							</template>
						</comment-form>
					</form>
			 </TabPane>

			 <TabPane ids="view-post" classes="">
				 	<div>
						 <h2>{{ this.post.title || 'The Title' }}</h2>
						 <br>
						<div v-html="this.post.content || 'Your Content'">
						</div>
					 </div>
			 </TabPane>

		</div>

		<br>
	</div>
</template>

<script>
	import CommentForm from '../components/CommentForm';
	import TabLink from '../components/TabLink';
	import TabPane from '../components/TabPane';

	export default {
		components: {
			CommentForm,
			TabLink,
			TabPane
		},
		data() {
			return {
				commentOrder: 'desc',
				post: {
					title: '',
					content: '',
					publishDate: null,
					author: {},
					comments: [],
					likes: [],
					created: '',
					updated: '',
					canComment: true,
					isPublish: true,
					isDeleted: false
				},
			}
		},

		mounted() {
			this.getPost();
		},

	
		methods: {

			getPost() {
				this.$http.get(`/posts/${this.$route.params.id}?_expand=user&_embed=comments`)
				.then(({data}) => {
					if (this.isAuthor(data.user.id)) {
						this.post = data;
					} else {
						this.$router.push(`/post/${this.$route.params.id}`);
					}
				})
			},

			publishPost() {
				this.post.isPublish = true;
				this.post.publishDate = this.now();
				this.updatePost();
			},

			updatePost() {	
				if (this.post.title.trim()) {
					this.post.updated = this.now();
					this.$http.patch(`/posts/${this.post.id}`, this.post)
						.then(({ data }) => {
							if (data.isPublish) {
								this.$toastr.success('post updated and published');
								this.$router.push(`/post/${data.id}`);
							} else {
								this.$toastr.success('post updated');
								this.$router.push('/home');
							}
						})
				}	else {
					this.$toastr.warning('all the fields are required');
				}
			},

			deletePost() {	
				if (confirm('Are you sure you wnat to delete this post?')) {
					this.post.isDeleted = true;
					this.$http.patch(`/posts/${this.post.id}`, this.post)
						.then(({ data }) => {
							this.$toastr.success('post deleted');
							this.$router.push('/home');
						})
				}
			},

			onInput(content) {
				this.post.content = content;
			},
	
			setDates() {
				this.post.created = this.now();
				this.post.update = this.now();
				if (this.post.isPublish) {
					this.post.publishDate = this.now();
				}
			},
	
			backToHome() {
				this.$router.push('/home')
			}
	
		}
	}
</script>

