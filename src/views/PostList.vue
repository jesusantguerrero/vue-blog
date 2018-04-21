<template>
    <div class="">
		<h1 class="my-4"> My posts </h1>

		<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
			<TabLink ids="published-tab" classes="active" refs="#published" title="Published"> </TabLink>
			<TabLink ids="draft-tab" refs="#draft" title="Drafts"> </TabLink>
			<TabLink ids="trash-tab" refs="#trash" title="Trash"> </TabLink>
		</ul>

			<div class="tab-content" id="pills-tabContent">
			 <TabPane ids="published" classes="show active">
				 	<MyTable
					 url="api/posts/"
					 >

					 </MyTable>
			 </TabPane>

			 <TabPane ids="draft" classes="">
				 draft
			 </TabPane>

			 <TabPane ids="trash" classes="">
				 trash
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
	import MyTable from '../components/MyTable.vue';

	export default {
		components: {
			AppWigget,
			AppPagination,
			PostCard,
			Search,
			TabLink,
			TabPane,
			MyTable
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

