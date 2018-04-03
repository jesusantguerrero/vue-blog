import Vue from 'vue';
import App from './App.vue';
import router from './router';
import jquery from 'jquery';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

export default new Vue({
    router,
    render: h => h(App)
}).$mount('#app');