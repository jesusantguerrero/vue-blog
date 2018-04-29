import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/app.sass';

import { ClientTable, Event } from 'vue-tables-2';

import App from './App.vue';
import PrivateTitle from './components/table/PrivateTitle.vue';
import Title from './components/table/Title.vue';
import Toastr from './utils/toastr';
import VeeValidate from 'vee-validate';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import VueFroala from './froala';
import VuePaginate from 'vue-paginate';
import axios from 'axios';
import mixin from './utils/mixin';
import router from './router';

axios.defaults.baseURL = 'http://localhost:3000/api';

Vue.use(VueFroala);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.use(VuePaginate);
Vue.use(ClientTable, {}, false, 'bootstrap4', 'default');
Vue.mixin(mixin);
Vue.component('title',Title)
Vue.component('privateTitle',PrivateTitle)

Vue.prototype.$toastr = Toastr;

export default new Vue({
		router,
    render: h => h(App)
}).$mount('#app');