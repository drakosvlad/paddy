<template>
    <div class="container overlay-container container-margin-top">
        <div class="form-group">
            <p class="align-center">Are you sure you want to permanently delete your account?</p>
            <div class="align-center">
                <button class="btn button-red" id="delete" @click="deleteAccount">Delete account</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConfirmAccountDeleteComponent",
        methods: {
            deleteAccount() {
                this.$store.dispatch("deleteAccount");
                this.$emit('hide');
            }
        }
    }
</script>

<style scoped>

</style>
