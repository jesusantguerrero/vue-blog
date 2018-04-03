<template>
	<div class="row">
		<div class="col-lg-8">

			<h1 class="mt-4"> {{ post.title }} </h1>

			<p class="lead"> by <a href="#"> {{ post.author.alias }} </a></p>
			<hr>

			<p> Posted on {{ post.publishDate }}</p>
			<hr>

			<img class="img-fluid rounded" src="http://placehold.it/900x300" alt="">
			<hr>

			<div class="content" v-html="post.content"></div>
			<hr>
			<h2> Comments </h2>
				<p> Post a new comment </p>
				<comment-form></comment-form>
				<comment-item :comment="comment"></comment-item>
				<comment-item :key="i" v-for="(comment, i) of comments" :comment="comment"></comment-item>
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
		data() {
			return {
				comments: [{
					author: {
						username: 'freesgen',
						alias: 'Jesus Guerrero',
						avatar: ''
					},
					content: 'this is a example content text',
					likes: ['jesus'],
					editMode: false 
				},
				{
					author: {
						username: 'freesgen',
						alias: 'Jesus Guerrero',
						avatar: ''
					},
					content: 'this is a example content text 2',
					likes: [],
					editMode: false 
				}
				],
				
				post: {
					id: 1,
					title: 'Post Title',
					content: 'example text',
					publishDate: new Date(),
					author: {
						username: 'freesgen',
						alias: 'Jesus Guerrero',
					},
					comments: [

					],
					likes: [],
					created: new Date(),
					updated: new Date()
				},
			}
		}
	}
</script>

