<template>
    <div class="container">
        <div class="row align-items-center">

            <div class="register-div col-12 col-md-6">
                <span class="main-heading">Welcome!</span>

                <div class="form-group">
                    <label for="username">Choose username:</label>
                    <input class="input-field form-control" type="text" id="username" name="username" placeholder="Username">
                </div>

                <div class="form-group">
                    <label for="create-password">Create master password:</label>
                    <input class="input-field form-control" type="password" id="create-password" name="password" placeholder="Password">
                </div>

                <div class="form-group">
                    <input class="input-field form-control" type="password" id="repeat-password" name="password" placeholder="Repeat password">
                </div>

                <div class="align-center">
                    <router-link class="login-link" to="/">Back to login</router-link>
                    <button class="btn button-primary">Register</button>
                </div>

            </div>
            <div class="img-paddy-div col-12 col-md-6">
                <img class="img-paddy" src="../../../images/Paddy.png" alt="Paddy">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RegisterComponent"
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/_variables.scss";

    .register-div {
        max-height: 400px;
        background-color: white;
        box-shadow: $shadow;
        border-radius: $card-border-radius;
        padding-top: 20px;
        padding-bottom: 10px;
    }

    .login-link {
        color: $focused-gray-50;
    }

    .login-link:visited {
        color: $focused-gray-50;
    }

    .buttons-group {
        text-align: center
    }


</style>
