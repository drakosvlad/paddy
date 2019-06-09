<template>
    <div class="container overlay-container">
        <div class="row">
            <h2>Create new password</h2>
        </div>
        <div class="row">
            <input class="input-field form-control" type="text" id="username" name="name" placeholder="Name">
            <input class="input-field form-control" type="password" id="password" name="password" placeholder="Password">
        </div>
        <div class="row">
            <button class="btn button-primary" id="saveButton">Save</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewPasswordComponent"
    }
</script>

<style scoped>

</style>
