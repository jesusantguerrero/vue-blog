<template>
    <div class="card mb-4">
        <img class="card-img-top" :src="this.getImageLink()" alt="Card image cap">
        <div class="card-body">
            <h2 class="card-title"> 
							<router-link :to="postLink">
								{{ post.title }} 
							</router-link>
						</h2>
            <p class="card-text"> {{ post.content | summary }} </p>
            <router-link :to="postLink" class="btn btn-primary">Read More &rarr;</router-link>
        </div>
        <div class="card-footer text-muted">
						Posted on 
            <router-link :to="postLink">{{ post.publishDate }}</router-link> by
            <router-link :to="`/author/${post.author.username}`"> {{ post.author.alias }} </router-link> 
						<router-link :to="authorLink"> <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""> </router-link>
            <router-link :to="postLink"> Comments:  {{ post.comments.length }} </router-link> |
            <span> Likes:  {{ post.comments.length }} </span>
						
        </div>
        </div>
</template>

<script>
export default {
	props: {
		post:{
			type: Object,
			default: {
				content: ''
			}
		}
	},
	data() {
		return {
			message: ``
		}
	},

	filters: {
		summary(text) {
			if (text) {
				const plainText = (text[0] == "<") ? $(text).text() : text;
				return plainText.slice(0, 200);
			} 
			return text;
		}
	},

	computed: {
		postLink() {
			return `/post/${this.post.id}`;
		},

		isHTML() {
			return (this.post.content && this.post.content[0] == "<")
		},

		authorLink() {
			return `/author/${this.post.author.username}`;
		},

	},

	methods: {
		getImageLink() {
			const { content } = this.post;
			if (this.isHTML) {
				const images = $(content).find("img");
				if (images.length > 0) {
					return images[0].src;
				} 
			}

			return 'http://placehold.it/750x300';
		}
	}
}
</script>

