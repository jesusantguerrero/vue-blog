<template>
	<div class="">
	
		<h1 class="my-4"> Write a new post </h1>
		<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
			<TabLink ids="create-post-tab" classes="active" refs="#create-post" title="Create Post"> </TabLink>
			<TabLink ids="view-post-tab" refs="#view-post" title="Preview Post"> </TabLink>
		</ul>

		<div class="tab-content" id="pills-tabContent">
			 <TabPane ids="create-post" classes="show active">
					<form>
						<div class="form-group">
							<input type="text" class="form-control" placeholder="The Title" v-model="post.title">
						</div>
				
						<comment-form btnSaveText="Create" @saved="createPost" @canceled="backToHome" @input="onInput">
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

							<template slot="actions-between">
								<button class="btn btn-primary" @click="saveDraft"> Draft </button>
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

	
		methods: {
			createPost() {
				if (this.post.title.trim()) {
					this.post.userId = this.getAuthor();
					this.setDates();
					this.$http.post('/posts', this.post)
						.then(({data}) => {
							if (data.isPublish) {
								this.$router.push(`/post/${data.id}`);
							} else {
								this.backToHome();
							}
						})
				} else {
					this.$toastr.warning('all the fields are required');
				}
			},

			saveDraft() {
				this.post.isPublish = false;
				this.createPost()
			},

			onInput(content) {
				this.post.content = content;
			},
	
			setDates() {
				const date = this.now();
				this.post.created = date;
				this.post.update = date;
				if (this.post.isPublish) {
					this.post.publishDate = date;
				}
			},
	
			backToHome() {
				this.$router.push('/home');
			}
	
		}
	}
</script>

