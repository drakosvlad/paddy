/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import * as SHA from 'js-sha256';

Vue.use(VueRouter);

//import ExampleComponent from './components/ExampleComponent.vue';
import LoginComponent from './components/pages/LoginComponent.vue';
import RegisterComponent from './components/pages/RegisterComponent.vue';
import PasswordsComponent from './components/pages/PasswordsComponent.vue';

const routes = [
    { path: '/', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/passwords', component: PasswordsComponent }
];

const router = new VueRouter({
    routes
});

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
    el: "#app",
    components: {
        LoginComponent,
        RegisterComponent,
        PasswordsComponent
    },
    data: function() {
        return {
            token: undefined,
            requestConfig: {
                headers: {
                    "Accept": "application/json"
                }
            }
        }
    },
    methods: {
        preRequest() {
            if (this.token !== undefined) {
                this.refreshToken();
            } else {
                this.unathorize();
            }
        },
        refreshToken() {
            this.requestConfig["Authorization"] = `bearer ${this.token}`;
            Axios.post(
                "/api/auth/refresh",
                {},
                this.requestConfig
            ).then((response) => {
                this.token = response.access_token;
            }).catch((error) => {
                this.unathorize();
                console.log(error);
            });
        },
        authorize(username, password) {
            let formData = {
                name: username,
                password: SHA.sha256(password)
            };
            console.log(formData);
            this.requestConfig["Authorization"] = undefined;
            Axios.post(
                "/api/auth/login",
                formData,
                this.requestConfig
            ).then((response) => {
                this.token = response.data.access_token;
            }).catch((error) => {
                this.unathorize();
                console.log(error);
            });
        },
        register(username, password) {
            let formData = {
                name: username,
                password: SHA.sha256(password)
            };
            console.log(formData);
            this.requestConfig["Authorization"] = undefined;
            Axios.post(
                "/api/auth/register",
                formData,
                this.requestConfig
            ).then((response) => {
                // TODO successful register
            }).catch((error) => {
                this.unathorize();
                console.log(error);
            });
        },
        unathorize() {

        }
    },
    mounted() {
        this.authorize("test123456", "123456");
    }
}).$mount('#app');
