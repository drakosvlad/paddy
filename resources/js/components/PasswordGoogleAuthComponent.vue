<template>
    <div class="container overlay-container">
        <div class="form-group">
            <label for="authCode">Enter Authenticator code:</label>
            <input class="input-field form-control" type="number" id="authCode" name="authCode" placeholder="Code" v-model="googleAuthCode.code">
            <div class="align-center">
                <button class="btn button-primary" id="get-password">Get password</button>
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
        }
    }
</script>

<style scoped>

</style>
