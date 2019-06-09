<template>
    <div class="container overlay-container">
        <div class="row">
            <h2>Create new password</h2>
        </div>
        <div class="row">
            <input class="input-field form-control" type="text" id="name" name="name" placeholder="Account name" v-model="newPassword.name">
            <input class="input-field form-control" type="text" id="username" name="username" placeholder="Username" v-model="newPassword.username">
            <input class="input-field form-control" type="password" id="password" name="password" placeholder="Password" v-model="newPassword.password">
        </div>
        <div class="row">
            <button class="btn button-primary" id="saveButton">Save</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewPasswordComponent",
        computed: {
            newPassword() {
                return this.$store.state.newPassword;
            }
        }
    }
</script>

<style scoped>

</style>
