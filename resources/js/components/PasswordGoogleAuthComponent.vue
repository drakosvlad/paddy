<template>
    <div class="container overlay-container">
        <label for="saveButton">Enter Authenticator code:</label>
        <input class="input-field form-control" type="number" id="username" name="name" placeholder="Code" v-model="googleAuthCode.code">
        <div class="align-center">
            <button class="btn button-primary" id="saveButton">Get password</button>
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
