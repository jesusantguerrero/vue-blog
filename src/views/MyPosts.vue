<template>
    <div class="row">
        <div class="col-md-8">
            <h1 class="my-4"> Page Heading
                <small> Subheading</small>
            </h1>

					<post-card :post="post"></post-card>
					<post-card :post="post"></post-card>
					<app-pagination></app-pagination>
        </div>

				<div class="col-md-4">
						<app-wigget title="Search">
							<search></search>
						</app-wigget>
				</div>

    </div>
    
</template>

<script>
	import PostCard from '../components/PostCard';
	import AppWigget from '../components/AppWigget';
	import Search from '../components/Search';
	import AppPagination from '../components/AppPagination';

	export default {
		components: {
			AppWigget,
			AppPagination,
			PostCard,
			Search
		},
		data() {
			return {
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

