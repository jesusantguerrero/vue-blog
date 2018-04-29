<template>
    <div class="">
		<h1 class="my-4"> My posts </h1>

		<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
			<TabLink ids="published-tab" classes="active" refs="#published" :title="`Published (${published.length})`"> </TabLink>
			<TabLink ids="draft-tab" refs="#draft" :title="`Drafts (${drafted.length})`"> </TabLink>
			<TabLink ids="trash-tab" refs="#trash" :title="`Trash (${trashed.length})`"> </TabLink>
		</ul>

			<div class="tab-content" id="pills-tabContent">
			 <TabPane ids="published" classes="show active">
  				<v-client-table :data="published" :columns="columns" :options="options" name="t-publish-post"></v-client-table>
			 </TabPane>

			 <TabPane ids="draft" classes="">
  				<v-client-table :data="drafted" :columns="columns" :options="optionsPrivate" name="t-draft-post"></v-client-table>
			 </TabPane>

			 <TabPane ids="trash" classes="">
  				<v-client-table :data="trashed" :columns="columns" :options="optionsPrivate" name="t-trash-post"></v-client-table>
			 </TabPane>

		</div>

    </div>
    
</template>

<script>
	import PostCard from '../components/PostCard';
	import AppWigget from '../components/AppWigget';
	import Search from '../components/Search';
	import AppPagination from '../components/AppPagination';
	import TabLink from '../components/TabLink';
	import TabPane from '../components/TabPane';

	const options = {
		pagination: {
			chunk: 25
		},
		perPage: 25,
		sortable: ['title', 'comments', 'likes', 'created', 'published'],
		storage: 'session',
		filterByColums: true,
		saveState: true,
		templates: {
			'#': (h, row, index) => {
					return index;
			},
			comments: (h, row, index) => {
				return row.comments.length;
			},
			likes: (h, row) => {
				return row.likes.length;
			},
			published: (h, row) => {
				return row.publishDate || '--'
			},
			title: 'title'
		}
	}

	const optionsPrivate = options;
	optionsPrivate.templates.title = 'privateTitle';

	export default {
		components: {
			AppWigget,
			AppPagination,
			PostCard,
			Search,
			TabLink,
			TabPane,
		},
		computed: {
			trashed() {
				return this.posts.filter((post) => post.isDeleted);
			},
			drafted() {
				return this.posts.filter((post) => !post.isPublish)
			},
			published() {
				return this.posts.filter((post) => post.isPublish && !post.isDeleted)
			}

		},
		data() {
			return {
				publishedFields: [
					{
						name: 'title',
						title: '#'
					},
					'title'
				],
				
				columns: ['#', 'title', 'comments', 'likes', 'created', 'published'],
        posts: [],
        options,
				optionsPrivate
			}
		},
		watch:{
			me() {
				if (this.me) {
					this.getPosts();
				}
			}
		},

		mounted() {
			this.getPosts();
		},
		methods: {
			getPosts() {
				if (this.me) {
					this.$http.get(`/posts?userId=${this.me.id}&_sort=id&_order=desc&_embed=comments`)
						.then(({ data }) => this.posts = data)
				}
			}
		}
	}
</script>

