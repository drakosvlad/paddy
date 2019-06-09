/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Axios from "axios";

import * as SHA from "js-sha256";

Vue.use(Vuex);
Vue.use(VueRouter);

import LoginComponent from './components/pages/LoginComponent.vue';
import RegisterComponent from './components/pages/RegisterComponent.vue';
import PasswordsComponent from './components/pages/PasswordsComponent.vue';
import SettingsComponent from "./components/pages/SettingsComponent";

const store = new Vuex.Store({
    state: {
        token: undefined,
        router: undefined,
        passwords: [{name: "Google", username: "lolkek"}, {name: "Yahoo", username: "lolkek"}],
        auth: {
            login: "test",
            password: "123456"
        },
        registerAuth: {
            login: "test",
            password: "123456"
        },
        newPassword: {
            name: "Yahoo",
            password: "asdf",
            username: "lolkek"
        },
        googleAuthCode: {
            code: ""
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
        },
        pushPassword(context, password) {
            context.passwords.push(password);
        }
    },
    getters: {
        isAuthorized(context) {
            return context.token !== undefined;
        }
    },
    actions: {
        authorize({ state, commit, dispatch }) {
            let formData = {
                name: state.auth.login,
                password: SHA.sha256(state.auth.password)
            };
            let config = {
                headers: {
                    "Accept": "application/json"
                }
            };
            Axios.post(
                "/api/auth/login",
                formData,
                config
            ).then((response) => {
                commit('setToken', response.data.access_token);
                dispatch('retrievePasswords');
                state.router.push({ path: '/passwords' });
            }).catch((error) => {
                commit('unauthorize');
                console.log(error);
            });
        },
        register({ state, commit }) {
            let formData = {
                name: state.registerAuth.login,
                password: SHA.sha256(state.registerAuth.password)
            };
            let config = {
                headers: {
                    "Accept": "application/json"
                }
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
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };
            Axios.post(
                "/api/auth/refresh",
                {},
                config
            ).then((response) => {
                commit('setToken', response.data.access_token);
            }).catch((error) => {
                commit('unauthorize');
                console.log(error);
            });
        },
        retrievePasswords({ state, commit }) {
            let config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };
            Axios.get(
                "/api/passwords",
                config
            ).then((response) => {
                commit('setPasswords', response.data.passwords);
            }).catch((error) => {
                commit('unauthorize');
                console.log(error);
            });
        },
        addPassword({ state }) {
            let config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };
            let formData = {
                name: state.newPassword.name,
                value: state.newPassword.password,
                username: state.newPassword.username
            };
            Axios.post(
                "/api/passwords",
                formData,
                config
            ).then((response) => {
                commit('pushPassword', response.data.password);
            }).catch((error) => {
                // TODO error handling
                //commit('unauthorize');
                console.log(error);
            });
        }
    }
});

const routes = [
    { path: '/', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/passwords', component: PasswordsComponent },
    { path: '/settings', component: SettingsComponent }
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
        //this.$store.dispatch('register');
    }
}).$mount('#app');
