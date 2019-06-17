<template>
    <div class="container overlay-container container-margin-top">
        <div class="form-group">
            <p class="align-center">Are you sure you want to delete your password?</p>
            <div class="align-center">
                <button class="btn button-red" id="delete" @click="deletePassword">Delete password</button>
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
