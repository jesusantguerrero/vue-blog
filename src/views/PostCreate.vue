<template>
	<div class="">
	
		<h1 class="my-4"> Write a new post </h1>
	
		<form>
	
			<div class="form-group">
	
				<input type="text" class="form-control" placeholder="The Title" v-model="post.title">
	
			</div>
	
			<comment-form btnSaveText="Create" @saved="createPost" @canceled="backToHome">
	
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
	
			</comment-form>
	
		</form>
	
	</div>
</template>

<script>
	import CommentForm from '../components/CommentForm';

	export default {
		components: {
			CommentForm
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
					isPublish: true
				},
			}
		},

	
		methods: {
			createPost(content) {
				this.setAutor();
				this.setDates();
				this.post.content = content;
				this.$http.post('/posts', this.post)
					.then(({data}) => {
						if (data.publishDate && data.isPublish) {
							this.$router.push(`post/${data.id}`);
						} else {
	
						}
					})
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
	
			}
	
		}
	}
</script>

