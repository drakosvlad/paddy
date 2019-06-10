<template>
    <div class="container overlay-container">
        <div class="form-group">
            <label for="name">Edit password:</label>
            <input class="input-field form-control" type="text" id="name" name="name" placeholder="Account name" v-model="editPassword.name">
            <input class="input-field form-control" type="text" id="username" name="username" placeholder="Username" v-model="editPassword.username">
            <input class="input-field form-control" type="password" id="password" name="password" placeholder="Password" v-model="editPassword.password">
            <div class="align-center">
                <button class="btn button-primary" id="saveButton" @click="savePassword">Save</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "PasswordEditComponent",
        computed: {
            editPassword() {
                return this.$store.state.editPassword;
            }
        },
        methods: {
            savePassword() {
                this.$store.dispatch('editPassword');
                this.$emit('hide');
            }
        }
    }
</script>

<style scoped>

</style>
