<template>
	<div class="row" v-if="post">
		<div class="col-lg-8">
			<br>
			<p class="lead" v-show="post"> <router-link :to="`/${origin}`"> {{ goBackText }} </router-link></p>

			<h1 class="mt-4"> {{ post.title }} </h1>

			<p class="lead" v-show="post"> by <router-link :to="authorLink"> {{ post.author.alias }} </router-link></p>
			<hr>

			<p> Posted on {{ post.publishDate }}</p>
			<hr>

			<div class="content" v-html="post.content"></div>
			<hr>
			<h2> Comments </h2>
				<p> Post a new comment </p>
				<comment-form v-if="post.canComment" :is-delete-on-save="true" :model="comment.content" btnSaveText="Create" @saved="createComment" @canceled="clearComment"></comment-form>
				<br>
				<p> Comments (current Order: {{ commentOrder }}) <button class="btn btn-primary" @click="changeCommentOrder"> Change Order </button></p>
				<comment-item :key="i" v-for="(comment, i) of commentList" :comment="comment" model="comment.content" @update-comment="updateComment" @delete-comment="deleteComment" @liked="commentLiked"></comment-item>
		</div>
  </div>

</template>

<script>
	import CommentItem from '../components/CommentItem';
	import CommentForm from '../components/CommentForm';

	const comment = {
      id: null,
      postId: null,
      author: {},
      content: '',
      likes: [],
      editMode: false,
      created: ''
    }

	export default {
		components: {
			CommentItem,
			CommentForm
		},

		computed: {
			commentList() {
				const { comments } = this.post;

				if (this.commentOrder == 'asc') {
					return comments.sort(( a, b) => a.id > b.id)
				} else {
					return comments.sort(( a, b) => a.id < b.id)					
				}
			},

			authorLink() {
				return `/author/${this.post.author.username}`;
			},

			goBackText() {
				const { origin } = this.$route.params;
				return (origin && origin.includes("home")) ? 'Volver al listado' : 'Volver a la Busqueda';
			},

			origin() {
				return this.$route.params.origin || '';
			}
			
		},

		data() {
			return {
				commentOrder: 'desc',
				comment: { ...comment },
				post: {
					author: {},
					comments: []
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

			createComment(content) {
				if (content && content.trim()) {
					this.comment.author = this.getAutor();
					this.setDates();

					this.comment.postId = this.post.id;
					this.comment.content = content; 
	
					this.$http.post('/comments', this.comment)
					.then(({data}) => {
						this.post.comments.push(data);
						this.$toastr.success('comment published');
						this.clearComment();
					})
				} else {
					this.$toastr.warning('all the fields are required')
				}
			},

			deletePost() {

			},

			getAutor() {
				return {
					"username": "freesgen",
					"alias": "Jesus Guerrero",
					"picture": ""
				}
			},
	
			setDates() {
				this.comment.created = this.now();
			},

			updateComment({ content, comment }) {
				if ( content.trim() ) {
					const index = this.post.comments.findIndex((item) => item.id == comment.id );
					comment.content = content;
	
					this.$http.patch(`/comments/${comment.id}`, comment)
						.then(({ data }) => {
							this.post.comments[index] = data;
							this.$toastr.success('comment updated');
						})
				} else {
					this.$toastr.warning('all the fields are required')
				}
			},

			deleteComment(id) {
				const index = this.post.comments.findIndex((item) => item.id == id );

				this.$http.delete(`/comments/${id}`)
					.then(() => {
						this.post.comments.splice(index, 1);
						this.$toastr.success('comment deleted');
					})
			},

			commentLiked(comment) {
				const index = this.post.comments.findIndex((item) => item.id == comment.id );
				const profile = this.getAutor();
				let message = 'post Liked';

				if (comment.likes.includes(profile.username)) {
					const likes = comment.likes.filter((item) => item !== profile.username);
					comment.likes = likes
					message = 'post disliked';
				} else {
					comment.likes.push(profile.username);
				}

				this.$http.patch(`/comments/${comment.id}`, comment)
					.then(({ data }) => {
						this.post.comments[index] = data;
						this.$toastr.success(message);
					})
			},

			changeCommentOrder() {
				this.commentOrder = this.commentOrder == 'asc' ? 'desc' : 'asc';
			},

			getMentions(content) {

			},

			clearComment() {
				this.comment = { ...comment };
			}

		}
	}
</script>

