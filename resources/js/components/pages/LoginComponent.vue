<template>
    <div class="container">
        <div class="row align-items-center">

            <div class="login-div col-12 col-md-6">
                <span class="main-heading">Welcome!</span>

                <div class="form-group">
                    <label for="username">Username:</label>
                    <input class="input-field form-control" type="text" id="username" name="username" placeholder="Username" v-model="auth.login">
                </div>

                <div class="form-group">
                    <label for="password">Password:</label>
                    <input class="input-field form-control" type="password" id="password" name="password" placeholder="Password" v-model="auth.password">
                </div>

                <div class="align-center">
                    <button class="btn button-secondary" @click="register">Register</button>
                    <button class="btn button-primary" @click="login">Login</button>
                </div>

            </div>
            <img class="img-paddy col-12 col-md-6" src="../../../images/Paddy_with_bg.png" alt="Paddy">
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

    .login-div {
        max-height: 400px;
        background-color: white;
        box-shadow: $shadow;
        border-radius: $card-border-radius;
        padding-top: 20px;
        padding-bottom: 10px;
    }

</style>
