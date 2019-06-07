<template>
    <div>
        <div class="card col-md-6 col-sm-6 col-12">
            <span>Welcome!</span>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <a href="#">Forgot password?</a>
            <button class="button-secondary">Register</button>
            <button class="button-primary">Login</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent"
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/_variables.scss";

</style>
