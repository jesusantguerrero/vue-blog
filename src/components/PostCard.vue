<template>
    <div class="card mb-4">
        <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap">
        <div class="card-body">
            <h2 class="card-title"> 
							<router-link :to="postLink">
								{{ post.title }} 
							</router-link>
						</h2>
            <p class="card-text"> {{ post.content }} </p>
            <router-link :to="postLink" class="btn btn-primary">Read More &rarr;</router-link>
        </div>
        <div class="card-footer text-muted">
						Posted on 
            <router-link :to="postLink">{{ post.publishDate }}</router-link> by
            <router-link :to="`/author/${post.author.username}`"> {{ post.author.alias }} </router-link> |
            <router-link :to="postLink"> Comments:  {{ post.comments.length }} </router-link> |
            <span> Likes:  {{ post.comments.length }} </span>
						
        </div>
        </div>
</template>

<script>
export default {
	props: ['post'],
	data() {
		return {
			message: ``
		}
	},
	computed: {
		postLink() {
			return `/post/${this.post.id}`;
		}
	}
}
</script>

