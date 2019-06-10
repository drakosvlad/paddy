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
import aes256 from "aes256";
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

Vue.use(Vuex);
Vue.use(VueRouter);

import LoginComponent from './components/pages/LoginComponent.vue';
import RegisterComponent from './components/pages/RegisterComponent.vue';
import PasswordsComponent from './components/pages/PasswordsComponent.vue';
import SettingsComponent from "./components/pages/SettingsComponent";

function processPassword(cipher, password) {
    password.name = cipher.decrypt(password.name);
    password.username = cipher.decrypt(password.username);
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const store = new Vuex.Store({
    state: {
        token: undefined,
        selectedPassword: undefined,
        totpSecret: undefined,
        router: undefined,
        passwords: [{name: "Google", username: "lolkek"}, {name: "Yahoo", username: "lolkek"}],
        auth: {
            login: "test",
            password: "123456"
        },
        registerAuth: {
            login: "test",
            password: "123456",
            totpCode: "",
            secret: speakeasy.generateSecret(),
            qrCodePath: ""
        },
        newPassword: {
            name: "Yahoo",
            password: "asdf",
            username: "lolkek"
        },
        googleAuthCode: {
            code: ""
        },
        cipher: undefined
    },
    mutations: {
        setRouter(context, router) {
            context.router = router;
        },
        setToken(context, token) {
            context.token = token;
        },
        initializeCipher(context, key) {
            context.cipher = aes256.createCipher(key);
        },
        unauthorize(context) {
            context.cipher = undefined;
            context.totpSecret = undefined;
            context.token = undefined;
            context.auth.password = "";
            context.router.push({ path: '/' });
        },
        setPasswords(context, passwords) {
            passwords.forEach(password => {
                processPassword(context.cipher, password);
            });
            context.passwords = passwords;
        },
        resetRegisterCredentials(context) {
            context.registerAuth.login = "";
            context.registerAuth.password = "";
        },
        resetAuthCredentials(context) {
            context.auth.login = "";
            context.auth.password = "";
        },
        resetNewPassword(context) {
            context.newPassword.name = "";
            context.newPassword.password = "";
            context.newPassword.username = "";
        },
        resetTOTPValue(context) {
            context.googleAuthCode.code = "";
        },
        pushPassword(context, password) {
            processPassword(context.cipher, password);
            context.passwords.push(password);
        },
        setQRCodePath(context, path) {
            context.registerAuth.qrCodePath = path;
        },
        setSelectedPassword(context, index) {
            context.selectedPassword = index;
        },
        setTOTPSecret(context, secret) {
            context.totpSecret = secret;
        }
    },
    getters: {
        isAuthorized(context) {
            return context.token !== undefined;
        },
        getPassword(context) {
            let verified = speakeasy.totp.verify({
                secret: context.totpSecret,
                encoding: 'ascii',
                token: context.googleAuthCode.code
            });

            if (verified) {
                let password = context.cipher.decrypt(context.passwords[context.selectedPassword].value);
                if (password !== undefined) {
                    copyToClipboard(password);
                }
                return context.cipher.decrypt(context.passwords[context.selectedPassword].value);
            }
            return undefined;
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
                commit('initializeCipher', state.auth.password);
                commit('resetAuthCredentials');
                dispatch('retrievePasswords');
                dispatch('initializeTotpSecret');
                state.router.push({ path: '/passwords' });
            }).catch((error) => {
                commit('unauthorize');
                console.log(error);
            });
        },
        register({ state, commit }) {
            let verified = speakeasy.totp.verify({ secret: state.registerAuth.secret.ascii, encoding: 'ascii', token: state.registerAuth.totpCode });
            if (!verified) {
                console.log("Wrong totp code");
                return;
            }

            commit('initializeCipher', state.registerAuth.password);

            let formData = {
                name: state.registerAuth.login,
                password: SHA.sha256(state.registerAuth.password),
                totp_secret: state.cipher.encrypt(state.registerAuth.secret.ascii)
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
                state.router.push({ path: '/' });
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
        addPassword({ state, commit }) {
            let config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };
            let formData = {
                name: state.cipher.encrypt(state.newPassword.name),
                value: state.cipher.encrypt(state.newPassword.password),
                username: state.cipher.encrypt(state.newPassword.username)
            };
            Axios.post(
                "/api/passwords",
                formData,
                config
            ).then((response) => {
                commit('pushPassword', response.data.password);
                commit('resetNewPassword');
            }).catch((error) => {
                // TODO error handling
                //commit('unauthorize');
                console.log(error);
            });
        },
        initializeAuthenticator({ state, commit }) {
            QRCode.toDataURL(state.registerAuth.secret.otpauth_url, (err, data_url) => {
                commit('setQRCodePath', data_url);
            });
        },
        initializeTotpSecret({ state, commit }) {
            let config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };
            Axios.get(
                '/api/auth/me',
                config
            ).then((response) => {
                commit('setTOTPSecret', state.cipher.decrypt(response.data.totp_secret));
            }).catch((error) => {
                this.commit('unauthorize');
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
