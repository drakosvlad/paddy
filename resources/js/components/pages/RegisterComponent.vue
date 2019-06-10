<template>
    <div class="container">
        <div class="row align-items-center">

            <div class="register-div col-12 col-md-6">
                <span class="main-heading">Welcome!</span>

                <div class="form-group">
                    <label for="username">Choose username:</label>
                    <input class="input-field form-control" type="text" id="username" name="username" placeholder="Username" v-model="registerAuth.login">
                </div>

                <div class="form-group">
                    <label for="create-password">Create master password:</label>
                    <input class="input-field form-control" type="password" id="create-password" name="password" placeholder="Password" v-model="registerAuth.password">
                    <img id="qrCode" :src="registerAuth.qrCodePath" />
                    <label for="totp-code">Enter authenticator code:</label>
                    <input class="input-field form-control" type="password" id="totp-code" name="totp-code" placeholder="Authenticator code" v-model="registerAuth.totpCode">
                </div>

                <div class="align-center">
                    <router-link class="login-link" to="/">Back to login</router-link>
                    <button class="btn button-primary" @click="register">Register</button>
                </div>

            </div>

            <img class="img-paddy col-12 col-md-6" src="../../../images/Paddy_with_bg.png" alt="Paddy">

        </div>
    </div>
</template>

<script>
    export default {
        name: "RegisterComponent",
        computed: {
            registerAuth() {
                return this.$store.state.registerAuth;
            }
        },
        methods: {
            register() {
                this.$store.dispatch("register");
            }
        },
        created() {
            this.$store.dispatch('initializeAuthenticator');
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/_variables.scss";

    .register-div {
        max-height: 600px;
        background-color: white;
        box-shadow: $shadow;
        border-radius: $card-border-radius;
        padding-top: 20px;
        padding-bottom: 10px;
    }

    .login-link {
        color: $focused-gray-50;
    }

    .login-link:visited {
        color: $focused-gray-50;
    }

    #qrCode {
        max-width: 150px;
        display: block;
    }

</style>
