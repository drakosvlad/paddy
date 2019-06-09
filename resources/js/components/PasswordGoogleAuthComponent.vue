<template>
    <div class="container overlay-container">
        <div class="row">
            <h2>Enter Authenticator code</h2>
        </div>
        <div class="row">
            <input class="input-field form-control" type="number" id="username" name="name" placeholder="Code">
        </div>
        <div class="row">
            <button class="btn button-primary" id="saveButton">Get password</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PasswordGoogleAuthComponent"
    }
</script>

<style scoped>

</style>
