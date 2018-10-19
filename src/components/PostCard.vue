<template>
    <div class="card mb-4">
        <img class="card-img-top" :src="this.getImageLink()" alt="Card image cap">
        <div class="card-body">
            <h2 class="card-title"> 
							<router-link :to="postLink">
								{{ post.title }} 
							</router-link>
						</h2>
            <div class="card-text" v-if="isFullContent" v-html="post.content"></div>
            <p class="card-text" v-else v-html="summary(post.content)"> </p>
            <router-link :to="postLink" class="btn btn-primary">Read More &rarr;</router-link>
        </div>
        <div class="card-footer text-muted">
						Posted on 
            <router-link :to="postLink">{{ post.publishDate }}</router-link> by
            <router-link :to="`/author/${post.author.username}`"> {{ post.author.alias }} (@{{ post.author.username}}) </router-link> 
						<router-link :to="authorLink"> <img class="d-flex mr-3 rounded-circle post__image" :src="post.author.picture || 'http://placehold.it/50x50'" alt=""> </router-link>
            <router-link :to="postLink"> Comments:  {{ post.comments.length }} </router-link> |
            <span> Likes:  {{ post.likes.length }} </span>
						
        </div>
        </div>
</template>

<script>
export default {
	props: {
		origin: {
			type: String,
			default: ''
		},
		post:{
			type: Object,
			default: {
				content: ''
			}
		},
		isFullContent: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			message: ``
		}
	},

	computed: {
		postLink() {
			return `/post/${this.post.id}?ref=${this.origin}`;
		},

		isHTML() {
			return (this.post.content && this.post.content[0] == "<")
		},

		authorLink() {
			return `/author/${this.post.author.username}`;
		},

	},

	methods: {
		summary(text) {
			if (text) {
				const plainText = (text[0] == "<") ? $(text).text() : text;
				return plainText.slice(0, 200);
			} 
			return text;
		},

		getImageLink() {
			const { content } = this.post;
			if (this.isHTML) {
				const images = $(content).find("img");
				if (images.length > 0) {
					return images[0].src;
				} 
			}

			return './img/placeholder-blog.jpg';
		}
	}
}
</script>

<style lang="sass">
	.post__image
		height: 50px
		width: 50px
</style>


