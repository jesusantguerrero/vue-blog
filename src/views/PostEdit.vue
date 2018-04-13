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
								<button v-show="!post.isPublish" class="btn btn-primary" @click="publishPost"> Publish </button>
							</template>

							<template slot="actions-after">
								<button class="btn btn-primary" @click="deletePost"> Eliminar </button>
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
				this.$http.get(`/posts/${this.$route.params.id}?_embed=comments`)
				.then(({data}) => {
					this.post = data;
				})
			},

			createPost() {
				this.setAutor();
				this.setDates();
				this.$http.post('/posts', this.post)
					.then(({data}) => {
						this.backToHome();
					})
			},

			publishPost() {
				this.post.isPublish = true;
				this.post.publishDate = this.now();
				this.updatePost();
			},

			updatePost() {	
				this.$http.patch(`/posts/${this.post.id}`, this.post)
					.then(({ data }) => {
						this.$toastr.success('post published');
					})
			},

			deletePost() {	
				this.post.isDeleted = true;
				this.$http.patch(`/posts/${this.post.id}`, this.post)
					.then(({ data }) => {
						this.$toastr.success('post deleted');
						// this.$router.push('/home');
					})
			},

			onInput(content) {
				this.post.content = content;
			},
	
			setAutor() {
				this.post.author = {
					"username": "freesgen",
					"alias": "Jesus Guerrero",
					"picture": ""
				}
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

