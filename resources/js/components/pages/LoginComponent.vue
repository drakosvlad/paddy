<template>
    <div class="container">
        <div class="card col-md-6 col-sm-6 col-12">
            <span class="welcome-message">Welcome!</span>

            <label for="username">Username:</label>
            <input class="input-field form-control" type="text" id="username" name="username" placeholder="Username" v-model="auth.login">

            <label for="password">Password:</label>
            <input class="input-field form-control" type="password" id="password" name="password" placeholder="Password" v-model="auth.password">
            <a class="link" href="#">Forgot password?</a>

            <button class="button-secondary" @click="register">Register</button>
            <button class="button-primary" @click="login">Login</button>
        </div>
        <div class="col-md-6 col-sm-6 col-12">
            <img src="../../../images/Paddy.png" alt="Paddy">
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent",
        computed: {
            auth() {
                return this.$store.state.auth;
            }
        },
        methods: {
            login() {
                this.$store.dispatch('authorize');
            },
            register() {
                this.$router.push({ path: '/register' });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/_variables.scss";

    .welcome-message {
        color: $friendly-blue-50;
        font-weight: bold;
        font-size: 36px;
    }

    .button-primary {
        background-color: $lively-green-50;
        color: white;
    }

    .button-primary:hover {
        background-color: $lively-green-40;
    }

    .button-secondary {
        border: 2px solid $lively-green-50;
        color: $lively-green-50;
    }

    .button-secondary:hover {
        background-color: $lively-green-1;
        border: 2px solid $lively-green-40;
        color: $lively-green-40;
    }

    .link {
        text-align: right;
        color: $focused-gray-50;
        //font-weight: lighter;
        font-style: italic;
    }

    .link:visited {
        color: $focused-gray-50;
    }

</style>
