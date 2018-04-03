import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Login';
import MyPosts from './views/MyPosts';
import Registration from './views/Registration';
import Post from './views/Post';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
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
				{
					path: '/my-posts',
					name: 'my-posts',
					component: MyPosts
				},

				{
					path: '/post/:id',
					name: 'post',
					component: Post
				},
    ]

})