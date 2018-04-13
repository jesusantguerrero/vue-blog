import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Login';
import MyPosts from './views/MyPosts';
import Registration from './views/Registration';
import Post from './views/Post';
import PostCreate from './views/PostCreate';

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
					path: '/my-posts',
					name: 'my-posts',
					component: MyPosts
				},
				{
					path: '/post/:id/:origin?',
					name: 'post',
					component: Post
				},
				{
					path: '/new-post',
					name: 'new-post',
					component: PostCreate
				},
    ]

})