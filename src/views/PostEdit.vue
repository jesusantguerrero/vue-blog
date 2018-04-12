<template>
	<div class="row">
			<h2> Write a new post </h2>
			<input type="text" value="">
			<comment-form v-if="post.canComment" btnSaveText="Create"></comment-form>
  </div>

</template>

<script>
	import CommentItem from '../components/CommentItem';
	import CommentForm from '../components/CommentForm';

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
			}
		},

		data() {
			return {
				commentOrder: 'desc',
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

			updateComment([content, id]) {
				const index = this.comments.findIndex((item) => item.id == id );
				console.log(index);
				this.comments[index].content = content;
			},

			changeCommentOrder() {
				this.commentOrder = this.commentOrder == 'asc' ? 'desc' : 'asc';
			}
		}
	}
</script>

