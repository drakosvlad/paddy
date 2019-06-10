<template>
    <div class="container">
        <div class="row">
            <password-card v-for="(password, index) in passwords" :key="index" :name="password.name" @click="showGoogleAuth"></password-card>
            <password-card @click="showNewPassword"></password-card>
        </div>
        <transition name="fade">
            <div class="veil" v-if="overlay" @click="disableOverlay"></div>
        </transition>
        <transition name="swing">
            <div class="overlay" v-if="overlay">
                <new-password-component v-if="newPassword" @hide="disableOverlay"></new-password-component>
                <password-google-auth-component v-if="googleAuth" @hide="disableOverlay"></password-google-auth-component>
            </div>
        </transition>
    </div>
</template>

<script>
    import PasswordCard from '../PasswordCard';
    import NewPasswordComponent from '../NewPasswordComponent';
    import PasswordGoogleAuthComponent from '../PasswordGoogleAuthComponent';

    export default {
        name: "PasswordsComponent",
        components: {
            PasswordCard,
            NewPasswordComponent,
            PasswordGoogleAuthComponent
        },
        data: function() {
            return {
                overlay: false,
                newPassword: false,
                googleAuth: false
            }
        },
        computed: {
            passwords() {
                console.log(this.$store.state.passwords);
                return this.$store.state.passwords;
            }
        },
        created() {
            //this.$store.dispatch("addPassword");
        },
        methods: {
            disableOverlay() {
                this.overlay = false;
                this.newPassword = false;
                this.googleAuth = false;
            },
            showNewPassword() {
                this.overlay = true;
                this.newPassword = true;
                this.googleAuth = false;
            },
            showGoogleAuth() {
                this.overlay = true;
                this.newPassword = false;
                this.googleAuth = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/_variables.scss";

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
