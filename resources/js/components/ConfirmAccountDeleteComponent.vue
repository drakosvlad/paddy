<template>
    <div class="container overlay-container">
        <div class="form-group">
            <label for="delete">Are you sure?</label>
            <div class="align-center">
                <button class="btn button-red" id="delete" @click="deleteAccount">Delete</button>
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