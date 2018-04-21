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
import AccountValidation from './views/AccountValidation';
import axios from 'axios';

Vue.use(Router)

const router = new Router({
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
						component: Login,
						meta: {isLoged: true}
        },
        {
            path: '/registration',
            name: 'registration',
						component: Registration,
						meta: {isLoged: true}
				},
				// Posts
				{
					path: '/list',
					name: 'list',
					alias: '/my-posts',
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
					component: PostList,
					meta: {requiresAuth: true}
				},
				{
					path: '/edit/post/:id/',
					name: 'post-edit',
					component: PostEdit,
					meta: {requiresAuth: true}
				},
				{
					path: '/new-post',
					name: 'new-post',
					component: PostCreate,
					meta: {requiresAuth: true}
				},
				// user
				{
					path: '/account/validation/:token?/:email?',
					name: 'validation',
					alias: 'accounts/validation',
					component: AccountValidation
				},
    ]

})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
		// if not, redirect to login page.
		axios.get('/auth/me')
			.then(({data}) =>{
				if (!data) {
					next({
						path: '/login',
						query: { redirect: to.fullPath }
					})
				} else {
					next()
				}
			});
  } else if (to.matched.some(record => record.meta.isLoged)) {
		axios.get('/auth/me')
			.then(({data}) => {
				if (data && data.isActive) {
					next({
						path: '/new-post',
						query: { redirect: to.fullPath }
					})
				} else if (data && !data.isActive) {
					next({
						path: '/account/validation',
						query: { redirect: to.fullPath }
					})
				} else {
					next()
				}
			})
  } else {
		next()
	}
})

export default router;