import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import mixin from './utils/mixin';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import VueFroala from './froala';

axios.defaults.baseURL = 'http://localhost:3600';

Vue.use(VueFroala);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.mixin(mixin)

export default new Vue({
		router,
    render: h => h(App)
}).$mount('#app');