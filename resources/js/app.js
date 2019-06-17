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

import MessageComponent from "./components/MessageComponent";

function processPassword(cipher, password) {
    password.name = cipher.decrypt(password.name);
    password.username = cipher.decrypt(password.username);
}

function messageFromError(error) {
    if (error.response.data.message != undefined) {
        return { error: true, text: error.response.data.message, time: 3000, active: true }
    }
    return messageFromErrorCode(error.response.status);
}

function messageFromErrorCode(code) {
    let message = { error: true, text: `Unknown error (${code})`, time: 3000, active: true }

    switch(code) {
        case 401:
            message.text = "Authentication failed!";
            break;
        case 404:
            message.text = "Item not found!";
            break;
        case 500:
            message.text = "Server error!";
            break;
    }

    return message;
}

function successMessage(text) {
    return { error: false, text: text, time: 3000, active: true };
}

function errorMessage(text) {
    return { error: true, text: text, time: 3000, active: true };
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
        passwords: [],
        auth: {
            login: "",
            password: ""
        },
        registerAuth: {
            login: "",
            password: "",
            totpCode: "",
            secret: speakeasy.generateSecret(),
            qrCodePath: ""
        },
        newPassword: {
            name: "",
            password: "",
            username: ""
        },
        editPassword: {
            name: "",
            password: "",
            username: ""
        },
        googleAuthCode: {
            code: ""
        },
        changePasswordAuth: {
            oldPassword: "",
            newPassword: "",
            newPassword2: ""
        },
        cipher: undefined,
        messages: [
        ]
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
        },
        updateEditPassword(context) {
            context.editPassword.name = context.passwords[context.selectedPassword].name;
            context.editPassword.username = context.passwords[context.selectedPassword].username;
            context.editPassword.password = "";
        },
        editPasswordApply(context) {
            context.passwords[context.selectedPassword].name = context.editPassword.name;
            context.passwords[context.selectedPassword].username = context.editPassword.username;
            context.passwords[context.selectedPassword].password = context.cipher.encrypt(context.editPassword.password);
        },
        resetEditPassword(context) {
            context.editPassword.name = "";
            context.editPassword.password = "";
            context.editPassword.username = "";
        },
        deletePasswordApply(context) {
            context.passwords.splice(context.selectedPassword, 1);
        },
        addMessage(context, message) {
            context.messages.push(message);
            setTimeout(function () { this.active = false; }.bind(message), message.time);
        },
        addErrorMessage(context, text) {
            let message = errorMessage(text);
            context.messages.push(message);
            setTimeout(function () { this.active = false; }.bind(message), message.time);
        },
        addSuccessMessage(context, text) {
            let message = successMessage(text);
            context.messages.push(message);
            setTimeout(function () { this.active = false; }.bind(message), message.time);
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
                console.log(error);
                commit('unauthorize');
                commit('addMessage', messageFromError(error));
            });
        },
        register({ state, commit }) {
            let verified = speakeasy.totp.verify({ secret: state.registerAuth.secret.ascii, encoding: 'ascii', token: state.registerAuth.totpCode });
            if (!verified) {
                commit('addErrorMessage', 'Wrong authenticator code!');
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
                commit('resetRegisterCredentials');
                commit('addMessage', successMessage("Registration completed successfully"));
            }).catch((error) => {
                commit('addMessage', messageFromError(error));
            });
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
                if (error.response.status === 401) {
                    commit('unauthorize');
                }
                commit('addMessage', messageFromError(error));
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
                if (error.response.status === 401) {
                    commit('unauthorize');
                }
                commit('addMessage', messageFromError(error));
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
                if (error.response.status === 401) {
                    commit('unauthorize');
                }
                commit('addMessage', messageFromError(error));
            });
        },
        editPassword({ state, commit }) {
            let config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };
            let formData = {
                name: state.cipher.encrypt(state.editPassword.name),
                value: state.cipher.encrypt(state.editPassword.password),
                username: state.cipher.encrypt(state.editPassword.username),
                _method: "PUT"
            };
            Axios.post(
                "/api/passwords/" + state.passwords[state.selectedPassword].id,
                formData,
                config
            ).then((response) => {
                commit('editPasswordApply', response.data.password);
                commit('resetEditPassword');
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('unauthorize');
                }
                commit('addMessage', messageFromError(error));
            });
        },
        deletePassword({ state, commit }) {
            let config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };
            let formData = {
                _method: "DELETE"
            };
            Axios.post(
                "/api/passwords/" + state.passwords[state.selectedPassword].id,
                formData,
                config
            ).then((response) => {
                commit('deletePasswordApply', response.data.password);
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('unauthorize');
                }
                commit('addMessage', messageFromError(error));
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
                commit('unauthorize');
            });
        },
        deleteAccount({ state, commit }) {
            let config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };

            Axios.delete(
                '/api/auth/me',
                config
            ).then((response) => {
                commit('unauthorize');
            }).catch((error) => {
                commit('unauthorize');
            });
        },
        changePassword({ state, commit }) {
            let config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `bearer ${state.token}`
                }
            };

            if (state.changePasswordAuth.newPassword !== state.changePasswordAuth.newPassword2) {
                commit('addErrorMessage', 'Passwords do not match');
            }

            let oldCipher = state.cipher;
            commit('initializeCipher', state.changePasswordAuth.newPassword);

            state.passwords.forEach((pass) => {
                let formData = {
                    name: state.cipher.encrypt(pass.name),
                    value: state.cipher.encrypt(oldCipher.decrypt(pass.value)),
                    username: state.cipher.encrypt(pass.username),
                    _method: "PUT"
                };
                Axios.post(
                    "/api/passwords/" + pass.id,
                    formData,
                    config
                ).catch((error) => {
                    if (error.response.status === 401) {
                        commit('unauthorize');
                    }
                    commit('addMessage', messageFromError(error));
                });
            });

            let formData = {
                password: SHA.sha256(state.changePasswordAuth.newPassword),
                totp_secret: state.cipher.encrypt(state.totpSecret),
                _method: "PUT"
            };

            Axios.post(
                "/api/auth/me",
                formData,
                config
            ).then(() => {
                commit('addSuccessMessage', 'Password changed succesfully');
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('unauthorize');
                }
                commit('addMessage', messageFromError(error));
            });
        }
    }
});

const routes = [
    {
        path: '/',
        component: LoginComponent,
    },
    {
        path: '/register',
        component: RegisterComponent
    },
    {
        path: '/passwords',
        component: PasswordsComponent,
        beforeEnter: (to, from, next) => {
            if (!store.getters.isAuthorized) {
                next('/');
            } else {
                next();
            }
        }
    },
    {
        path: '/settings',
        component: SettingsComponent,
        beforeEnter: (to, from, next) => {
            if (!store.getters.isAuthorized) {
                next('/');
            } else {
                next();
            }
        }
    }
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
        PasswordsComponent,
        MessageComponent
    },
    data: function() {
        return {

        }
    },
    computed: {
        isAuthorized() {
            return this.$store.getters.isAuthorized;
        },
        messages() {
            return this.$store.state.messages;
        }
    },
    methods: {
        logout() {
            this.$store.commit('unauthorize');
        },
        settings() {
            this.$router.push('/settings');
        }
    }
}).$mount('#app');
