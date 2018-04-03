import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Login';
import Registration from './views/Registration';

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
    ]

})