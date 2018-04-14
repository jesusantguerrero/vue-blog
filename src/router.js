import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Login';
import PostList from './views/PostList';
import Registration from './views/Registration';
import Post from './views/Post';
import PostCreate from './views/PostCreate';
import PostEdit from './views/PostEdit';
import User from './views/User';

Vue.use(Router)

export default new Router({
    routes: [
				// generals
        {
            path: '/',
						name: 'home',
						alias: "/home",
            component: Home
				},
				{     
					path: '/author/:username',
					name: 'user',
					alias: "/user",
					component: User
				},
				// Auth
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
				},
				// Posts
				{
					path: '/list',
					name: 'list',
					component: PostList
				},
				{
					path: '/post/:id/:origin?',
					name: 'post',
					component: Post
				},
				{
					path: '/list',
					name: 'post-list',
					component: PostList
				},
				{
					path: '/edit/post/:id/',
					name: 'post-edit',
					component: PostEdit
				},
				{
					path: '/new-post',
					name: 'new-post',
					component: PostCreate
				},
    ]

})