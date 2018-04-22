import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import mixin from './utils/mixin';
import Toastr from './utils/toastr';
import { ClientTable, Event } from 'vue-tables-2';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import VueFroala from './froala';

axios.defaults.baseURL = 'http://localhost:3000/api';

Vue.use(VueFroala);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.use(ClientTable, {}, false, 'bootstrap4', 'default');
Vue.mixin(mixin);

Vue.prototype.$toastr = Toastr;

export default new Vue({
		router,
    render: h => h(App)
}).$mount('#app');