<template>
    <div class="container">
        <div class="settings-div ">
            <span class="main-heading">Settings</span>
            <div class="form-group">
                <label for="prev-password">Change password:</label>
                <input class="input-field form-control" type="password" id="prev-password" name="password" placeholder="Previous password" v-model="changePasswordData.oldPassword">
                <input class="input-field form-control" type="password" id="new-password" name="password" placeholder="New password" v-model="changePasswordData.newPassword">
                <input class="input-field form-control" type="password" id="repeat-password" name="password" placeholder="Repeat password" v-model="changePasswordData.newPassword2">
                <div class="align-center">
                    <button class="btn button-secondary" @click="changePassword">Change password</button>
                </div>
                <div class="align-center">
                    <button class="btn button-red" id="delete" @click="showDeleteConfirmation">Delete</button>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="veil" v-if="overlay" @click="disableOverlay"></div>
        </transition>
        <transition name="swing">
            <div class="overlay" v-if="overlay">
                <keep-alive>
                    <component :is="currentOverlay" @hide="disableOverlay"></component>
                </keep-alive>
            </div>
        </transition>
    </div>
</template>

<script>
    import ConfirmAccountDeleteComponent from '../ConfirmAccountDeleteComponent';

    export default {
        name: "SettingsComponent",
        components: {
            ConfirmAccountDeleteComponent
        },
        data: function() {
            return {
                currentOverlay: "",
                overlay: false
            }
        },
        computed: {
            changePasswordData() {
                return this.$store.state.changePasswordAuth;
            }
        },
        methods: {
            disableOverlay() {
                this.overlay = false;
            },
            showDeleteConfirmation() {
                this.currentOverlay = "ConfirmAccountDeleteComponent";
                this.overlay = true;
            },
            changePassword() {
                this.$store.dispatch('changePassword');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/_variables.scss";

    .settings-div {
        background-color: white;
        box-shadow: $shadow;
        max-width: 600px;
        border-radius: $card-border-radius;
        margin: 0 auto;
    }

    @media (min-width: 769px) {
        .settings-div {
            padding: 20px 100px 10px;
        }
    }

    @media (max-width: 768px) {
        .settings-div {
            padding: 20px 10px 10px;
        }
    }

    .veil {
        width: 100vw;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        opacity: 1;
        transition: opacity .15s;
    }

    .overlay {
        width: 100vw;
        position: fixed;
        height: $overlay-height;
        top: calc(100% - #{$overlay-height});
        left: 0;
        background: white;
        margin-top: 0;
        transition: margin-top .3s;
        box-shadow: $shadow;
    }

    .swing-enter {
        margin-top: $overlay-height + 10px;
    }

    .swing-leave-active {
        margin-top: $overlay-height + 10px;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-leave-active {
        opacity: 0;
    }

</style>
