<template>
    <div class="container">
        <div class="row">
            <password-card v-for="(password, index) in passwords" :key="index" :name="password.name" :username="password.username" @click="showGoogleAuth(index)" @edit="showEdit(index)" @delete="showDelete(index)"></password-card>
            <password-card @click="showNewPassword"></password-card>
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
    import PasswordCard from '../PasswordCard';
    import NewPasswordComponent from '../NewPasswordComponent';
    import PasswordGoogleAuthComponent from '../PasswordGoogleAuthComponent';
    import PasswordEditComponent from '../PasswordEditComponent';
    import PasswordDeleteComponent from '../PasswordDeleteComponent';

    export default {
        name: "PasswordsComponent",
        components: {
            PasswordCard,
            NewPasswordComponent,
            PasswordGoogleAuthComponent,
            PasswordEditComponent,
            PasswordDeleteComponent
        },
        data: function() {
            return {
                currentOverlay: "",
                overlay: false
            }
        },
        computed: {
            passwords() {
                return this.$store.state.passwords;
            }
        },
        created() {
            //this.$store.dispatch("addPassword");
        },
        methods: {
            disableOverlay() {
                this.overlay = false;
            },
            showNewPassword() {
                this.currentOverlay = "NewPasswordComponent";
                this.overlay = true;
            },
            showGoogleAuth(key) {
                this.$store.commit('setSelectedPassword', key);
                this.currentOverlay = "PasswordGoogleAuthComponent";
                this.overlay = true;
            },
            showEdit(key) {
                this.$store.commit('setSelectedPassword', key);
                this.$store.commit('updateEditPassword');
                this.currentOverlay = "PasswordEditComponent";
                this.overlay = true;
            },
            showDelete(key) {
                this.$store.commit('setSelectedPassword', key);
                this.currentOverlay = "PasswordDeleteComponent";
                this.overlay = true;
            },
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
