<template>
    <div class="container overlay-container container-margin-top">

        <div class="form-group">
            <label for="authCode">Enter Authenticator code:</label>
            <input class="input-field form-control" type="number" id="authCode" name="authCode" placeholder="Code" v-model="googleAuthCode.code">
            <div class="align-center">
                <button class="btn button-primary" id="get-password" @click="getPassword">Get password</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PasswordGoogleAuthComponent",
        computed: {
            googleAuthCode() {
                return this.$store.state.googleAuthCode;
            }
        },
        methods: {
            getPassword() {
                let passwd = this.$store.getters.getPassword;
                if (passwd !== undefined) {
                    this.$store.commit('addSuccessMessage', 'Password was copied to clipboard');
                    this.$emit('hide');
                } else {
                    this.$store.commit('addErrorMessage', 'Wrong authenticator code!');
                }
            }
        }
    }
</script>

<style scoped>

</style>
