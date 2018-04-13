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
				<comment-form v-if="post.canComment" btnSaveText="Create"></comment-form>
				<br>
				<p> Comments (current Order: {{ commentOrder }}) <button @click="changeCommentOrder"> Change Order </button></p>
				<comment-item :key="i" v-for="(comment, i) of commentList" :comment="comment" model="comment.content" @update-comment="updateComment"></comment-item>
		</div>
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
				this.comments[index].content = content;
			},

			changeCommentOrder() {
				this.commentOrder = this.commentOrder == 'asc' ? 'desc' : 'asc';
			}
		}
	}
</script>

