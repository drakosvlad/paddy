/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(Vuex);
Vue.use(VueRouter);

//import ExampleComponent from './components/ExampleComponent.vue';
import LoginComponent from './components/pages/LoginComponent.vue';
import RegisterComponent from './components/pages/RegisterComponent.vue';
import PasswordsComponent from './components/pages/PasswordsComponent.vue';
import * as SHA from "js-sha256";
import Axios from "axios";

const store = new Vuex.Store({
    state: {
        token: undefined,
        router: undefined,
        passwords: undefined,
        auth: {
            login: "test123456",
            password: "123456"
        },
        registerAuth: {
            login: "",
            password: ""
        }
    },
    mutations: {
        setRouter(context, router) {
            context.router = router;
        },
        setToken(context, token) {
            context.token = token;
        },
        unauthorize(context) {
            context.token = undefined;
            context.auth.password = "";
            context.router.push({ path: '/' });
        },
        setPasswords(context, passwords) {
            context.passwords = passwords;
        },
        resetRegisterCredentials(context) {
            context.registerAuth.login = "";
            context.registerAuth.password = "";
        }
    },
    getters: {
        isAuthorized(context) {
            return context.token !== undefined;
        }
    },
    actions: {
        authorize({ state, commit }) {
            let formData = {
                name: state.auth.login,
                password: SHA.sha256(state.auth.password)
            };
            let config = {
                "Accept": "application/json"
            };
            Axios.post(
                "/api/auth/login",
                formData,
                config
            ).then((response) => {
                commit('setToken', response.data.access_token);
                state.router.push({ path: '/passwords' });
            }).catch((error) => {
                commit('unathorize');
                console.log(error);
            });
        },
        register({ state, commit }) {
            let formData = {
                name: state.registerAuth.login,
                password: SHA.sha256(state.registerAuth.password)
            };
            let config = {
                "Accept": "application/json"
            };
            Axios.post(
                "/api/auth/register",
                formData,
                config
            ).then((response) => {
                state.router.push({ path: '/login' });
            }).catch((error) => {
                console.log(error);
            });
            commit('resetRegisterCredentials');
        },
        refreshToken({ state, commit }) {
            let config = {
                "Accept": "application/json",
                "Authorization": `bearer ${state.token}`
            };
            Axios.post(
                "/api/auth/refresh",
                {},
                config
            ).then((response) => {
                commit('setToken', response.access_token);
            }).catch((error) => {
                commit('unauthorize');
                console.log(error);
            });
        },
        retrievePasswords({ state, commit }) {
            let config = {
                "Accept": "application/json",
                "Authorization": `bearer ${state.token}`
            };
            Axios.post(
                "/api/passwords",
                {},
                config
            ).then((response) => {
                commit('setPasswords', response.passwords);
            }).catch((error) => {
                commit('unauthorize');
                console.log(error);
            });
        }
    }
});

const routes = [
    { path: '/', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/passwords', component: PasswordsComponent }
];

const router = new VueRouter({
    routes
});

store.commit('setRouter', router);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    router,
    store,
    el: "#app",
    components: {
        LoginComponent,
        RegisterComponent,
        PasswordsComponent
    },
    data: function() {
        return {

        }
    },
    methods: {

    },
    created() {
        this.$store.dispatch('authorize');
    }
}).$mount('#app');
