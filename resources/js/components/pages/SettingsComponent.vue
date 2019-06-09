<template>
    <div class="container">
        <span class="main-heading">Settings</span>

        <div class="form-group">
            <label for="change-username">Change username</label>
            <input class="input-field form-control" type="text" id="change-username" name="new-username" placeholder="New username">
        </div>

    </div>
</template>

<script>
    export default {
        name: "SettingsComponent"
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/_variables.scss";

</style>
