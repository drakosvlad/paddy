<template>
    <div class="container overlay-container">
        <div class="form-group">
            <label for="name">Create new password:</label>
            <input class="input-field form-control" type="text" id="name" name="name" placeholder="Account name" v-model="newPassword.name">
            <input class="input-field form-control" type="text" id="username" name="username" placeholder="Username" v-model="newPassword.username">
            <input class="input-field form-control" type="password" id="password" name="password" placeholder="Password" v-model="newPassword.password">
            <div class="align-center">
                <button class="btn button-primary" id="saveButton" @click="savePassword">Save</button>
            </div>
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
        },
        methods: {
            savePassword() {
                this.$store.dispatch('addPassword');
                this.$emit('hide');
            }
        }
    }
</script>

<style scoped>

</style>
