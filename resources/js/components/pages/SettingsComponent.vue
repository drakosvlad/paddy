<template>
    <div class="container">

        <div class="settings-div ">
            <span class="main-heading">Settings</span>

            <div class="form-group">
                <label for="change-username">Change username:</label>
                <input class="input-field form-control" type="text" id="change-username" name="new-username" placeholder="New username">
                <div class="align-center">
                    <button class="btn button-secondary">Change username</button>
                </div>
            </div>

            <div class="form-group">
                <label for="prev-password">Change password:</label>
                <input class="input-field form-control" type="password" id="prev-password" name="password" placeholder="Previous password">
            </div>

            <div class="form-group">
                <input class="input-field form-control" type="password" id="new-password" name="password" placeholder="New password">
            </div>

            <div class="form-group">
                <input class="input-field form-control" type="password" id="repeat-password" name="password" placeholder="Repeat password">
                <div class="align-center">
                    <button class="btn button-secondary">Change password</button>
                </div>
            </div>

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

    .settings-div {
        background-color: white;
        box-shadow: $shadow;
        max-width: 600px;
        border-radius: $card-border-radius;
        padding: 20px 100px 10px;
        margin: 0 auto;
    }

</style>
