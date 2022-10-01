import Vue from 'vue';

import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import i18n from "@/plugins/i18n";
import App from '@/App.vue';
import {canFunction} from "@/services/helpers";

import "@/assets/css/master.scss"

// AuthService
import AuthService from '@/services/auth.service';
Vue.prototype.$auth = AuthService;
Vue.prototype.$can = canFunction

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app');
