<template>
	 <div class="media mt-4 comment-item">
			<router-link :to="authorLink"> <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""> </router-link>
			<div class="media-body">
				<h5 class="mt-0"> <router-link :to="authorLink"> {{ comment.author.alias }} </router-link> </h5>
				<div v-if="!comment.editMode" class="commet-content" v-html="comment.content"></div>
				<comment-form v-else :model="comment.content" :id="comment.id" btnSaveText="Update" @saved="updateComment" @canceled="cancelComment"></comment-form>
				<br>
				<p class="media-footer text-muted">
						Posted on {{ comment.created }} |
						<a href="#" @click="addLikes">
            	<span class="comment-item__likes" :class="{myLike: hasMyLike }"> Likes:  {{ comment.likes.length }} </span>
						</a>
        </p>
				<p v-if="isAuthor(comment.author.id)" :class="{isAuthor: isAuthor(comment.author.id)}">
            <button class="btn btn-primary" v-if="!comment.editMode" @click="toggleEditMode"> {{ btnEditText }} </button>
            <button class="btn btn-danger" @click="deleteComment"> Delete </button>
				</p>
			</div>
    </div>
</template>

<script>
	import CommentForm from '../components/CommentForm';

	export default {
		props: ['comment'],
		components: {
			CommentForm
		},
		computed: {
			authorLink() {
				return `/author/${this.comment.author.username}`;
			},

			btnEditText() {
				return this.comment.editMode ? 'Actualizar' : 'Edit'
			},

			hasMyLike() {
				if (this.me) {
					return this.comment.likes.includes(this.me.id)
				}
			}
		},

		methods: {
			toggleEditMode() {
				if (this.comment.editMode != undefined) {
					this.comment.editMode = !this.comment.editMode;
				} else {
					this.comment.editMode = false;
				}
			},

			updateComment(...args) {
				this.comment.editMode = false;
				console.log(args)
				this.$emit('update-comment', { content: args[0] , comment: this.comment });
			},

			deleteComment() {
				this.$emit('delete-comment', this.comment.id);
			},

			addLikes(e) {
				e.preventDefault();
				this.$emit('liked', this.comment);
			},

			cancelComment() {
				this.toggleEditMode();
			}
		}
	}
</script>


<style lang="sass">
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

