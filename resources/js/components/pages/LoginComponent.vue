<template>
    <div class="container">
        <div class="login-card col-md-6 col-sm-6 col-12">
            <span class="welcome-message">Welcome!</span>

            <div class="my-input-group">
                <label for="username">Username:</label>
                <input class="input-field form-control" type="text" id="username" name="username" placeholder="Username" v-model="auth.login">
            </div>

            <div class="my-input-group">
                <label for="password">Password:</label>
                <input class="input-field form-control" type="password" id="password" name="password" placeholder="Password" v-model="auth.password">
            </div>

            <a class="forgot-link" href="#">Forgot password?</a>

            <div class="buttons-group">
                <button class="btn button-secondary" @click="register">Register</button>
                <button class="btn button-primary" @click="login">Login</button>
            </div>

        </div>
        <div class="img-div col-md-6 col-sm-6 col-12">
            <img class="img-paddy" src="../../../images/Paddy.png" alt="Paddy">
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

    .login-card {
        background-color: white;
        box-shadow: $shadow;
        border-radius: 10px;
    }

    .welcome-message {
        color: $friendly-blue-50;
        font-weight: bold;
        font-size: 36px;
    }

    .my-input-group {
        margin: 10px 0;
    }

    .forgot-link {
        float: right;
        color: $focused-gray-50;
        font-style: italic;
    }

    .forgot-link:visited {
        color: $focused-gray-50;
    }

    .buttons-group {
        clear: both;
        text-align: center
    }

    .img-div {
        background: url("../../../images/Vector.png") no-repeat bottom;
        background-size: 80%;
        -webkit-filter: drop-shadow($shadow);
        filter: drop-shadow($shadow);
    }

    .img-paddy {
        width: 100%;
    }

</style>
