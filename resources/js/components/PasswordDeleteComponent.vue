<template>
    <div class="container overlay-container">

        <div class="form-group">
            <label for="authCode">Are you sure?</label>
            <div class="align-center">
                <button class="btn button-red" id="delete" @click="deletePassword">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PasswordDeleteComponent",
        methods: {
            deletePassword() {
                this.$store.dispatch("deletePassword");
                this.$emit('hide');
            }
        }
    }
</script>

<style scoped>

</style>
