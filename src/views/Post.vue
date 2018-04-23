<template>
	<div class="row" v-if="post && post.author">
		<div class="col-lg-8">
			<br>
			<div class="lead d-flex justify-content-between w-100" v-show="post"> 
				<router-link :to="`${origin}`"> {{ goBackText }} </router-link>
				<div v-if="isAuthor(post.userId)">
					<button @click="deletePost" class="btn btn-danger"> X </button>	
					<router-link class="btn btn-success" :to="`/edit/post/${this.post.id}`"> Edit </router-link>
				</div>
			</div>

			<h1 class="mt-4"> {{ post.title }} </h1>

			<p class="lead" v-show="post"> by <router-link :to="authorLink"> {{ post.author.alias }} </router-link></p>
			<hr>

			<p> Posted on {{ post.publishDate }}</p>
			<hr>

			<div class="content" v-html="post.content"></div>
			<p class="media-footer text-muted" v-if="post.likes">
				<a href="#" @click.prevent="postLiked">
            <span class="comment-item__likes" :class="{myLike: hasMyLike }"> Likes:  {{ post.likes.length }} </span>
				</a>
      </p>
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
			created: '',
			mentions: []
    }

	export default {
		components: {
			CommentItem,
			CommentForm
		},

		computed: {
			commentList() {
				const { comments } = this;
				if (this.commentOrder == 'asc') {
					return comments.sort(( a, b) => a.id > b.id)
				} else {
					return comments.sort(( a, b) => a.id < b.id)					
				}
			},

			authorLink() {
				return (this.post.author) ? `/author/${this.post.author.username}` : null;
			},

			goBackText() {
				const { ref } = this.$route.query;
				return (ref && (/[home]|[author]/g.test(ref))) ? 'Volver al listado' : 'Volver a la Busqueda';
			},

			origin() {
				return this.$route.query.ref || '';
			},


			hasMyLike() {
				if (this.me) {
					return this.post.likes.includes(this.me.id)
				}
			}
			
		},

		data() {
			return {
				commentOrder: 'desc',
				comment: { ...comment },
				comments: [],
				post: {
					author: {},
					comments: []
				},
			}
		},

		mounted() {
			this.getPost();
			this.getComments();
		},

		methods: {
			getPost() {
				this.$http.get(`/posts/${this.$route.params.id}?_expand=user`)
				.then(({data}) => {
					if (data) {
						data.author = data.user;
					}	
					this.post = data;
				})
			},

			getComments(postId) {
				this.$http.get(`/comments/?postId=${this.$route.params.id}&_expand=user`)
				.then(({ data }) => {
					if (data && data.length) {
						this.comments = data.map((comment) => {
							comment.author = comment.user;
							return comment;
						})
					}
				})
			},

			createComment(content) {
				if (this.me) {
					if (content && content.trim()) {
						this.comment.userId = this.getAuthor();
						this.getMentions(content)
						this.setDates();
	
						this.comment.postId = this.post.id;
						this.comment.content = content; 
		
						this.$http.post('/comments', this.comment)
						.then(({data}) => {
							data.author = this.me;
							this.comments.push(data);
							this.$toastr.success('comment published');
							this.clearComment();
						})
					} else {
						this.$toastr.warning('all the fields are required')
					}
				} else {
						this.$toastr.warning('you must be an user to comment on this post')
				}
			},

			deletePost() {	
				this.post.isDeleted = true;
				this.isPublished = false;
				this.$http.patch(`/posts/${this.post.id}`, this.post)
					.then(({ data }) => {
						this.$toastr.success('post deleted');
						this.$router.push('/home');
					})
			},
	
			setDates() {
				this.comment.created = this.now();
			},

			updateComment({ content, comment }) {
				if ( content.trim() ) {
					this.getMentions(content)
					const index = this.comments.findIndex((item) => item.id == comment.id );
					comment.content = content;
	
					this.$http.patch(`/comments/${comment.id}`, comment)
						.then(({ data }) => {
							this.comments[index] = data;
							this.$toastr.success('comment updated');
						})
				} else {
					this.$toastr.warning('all the fields are required')
				}
			},

			deleteComment(id) {
				const index = this.comments.findIndex((item) => item.id == id );

				this.$http.delete(`/comments/${id}`)
					.then(() => {
						this.comments.splice(index, 1);
						this.$toastr.success('comment deleted');
					})
			},

			commentLiked(comment) {
				if (!this.me) {
					this.$toastr.info('you must be an user to like this comment');
				} else {

				const index = this.comments.findIndex((item) => item.id == comment.id );
				const profile = this.me;
				let message = 'post Liked';

				if (comment.likes.includes(profile.id)) {
					const likes = comment.likes.filter((item) => item !== profile.id);
					comment.likes = likes
					message = 'post disliked';
				} else {
					comment.likes.push(profile.id);
				}

				this.$http.put(`/comments/${comment.id}`, comment)
					.then(({ data }) => {
						this.comments[index] = data;
						this.$toastr.success(message);
					})
				}
			},

			postLiked() {
				if (!this.me) {
					this.$toastr.info('you must be an user to like this comment');
				} else {

				const profile = this.me;
				const { post } = this;
				let message = 'post Liked';

				if (post.likes.includes(profile.id)) {
					const likes = post.likes.filter((item) => item !== profile.id);
					post.likes = likes
					message = 'post disliked';
				} else {
					this.post.likes.push(profile.id);
				}

				this.$http.put(`/posts/${post.id}`, post)
					.then(({ data }) => {
						this.post.likes = data.likes;
						this.$toastr.success(message);
					})
				}
			},

			changeCommentOrder() {
				this.commentOrder = this.commentOrder == 'asc' ? 'desc' : 'asc';
			},

			getMentions(content) {
				const $mentions = $(content).find('.atwho-inserted');
				const mentions = [];
				if ($mentions.length > 0)  {
					$mentions.each((_, $mention) => {
						const mentionItem = $($mention).text();
						if (!mentions.includes(mentionItem))
							mentions.push(mentionItem)
					});
				}
				this.comment.mentions = mentions;
			},

			clearComment() {
				this.comment = { ...comment };
			}
		}
	}
</script>

<style lang="sass">
	.atwho-inserted
		background: transparentize(#06f, .8)
		border-radius: 4px
		padding: 0 5px

	.comment-item
		.isAuthor
			visibility: hidden
			transition: all ease .3s
		&:hover
			.isAuthor
				visibility: visible

	.comment-item__likes
		color: grey
		font-weight: bolder

		&.myLike
			color: green
			
</style>


