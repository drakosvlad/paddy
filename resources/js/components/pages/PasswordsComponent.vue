<template>
    <div class="container">
        <h1>Passwords</h1>
        <div class="row">
            <password-card v-for="(password, index) in passwords" :key="index" :name="password.name"></password-card>
            <password-card @click="showNewPassword"></password-card>
        </div>
        <transition name="fade">
            <div class="veil" v-if="overlay" @click="disableOverlay"></div>
        </transition>
        <transition name="swing">
            <div class="overlay" v-if="overlay"></div>
        </transition>
    </div>
</template>

<script>
    import PasswordCard from '../PasswordCard';

    export default {
        name: "PasswordsComponent",
        components: {
            PasswordCard
        },
        data: function() {
            return {
                overlay: false
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
            },
            showNewPassword() {
                this.overlay = true;
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
        background: rgba(0, 0, 0, 0.4);
        top: 0;
        left: 0;
        opacity: 1;
        transition: opacity .15s;
    }

    .overlay {
        width: 100vw;
        position: fixed;
        height: 200px;
        top: calc(100% - 200px);
        left: 0;
        background: white;
        margin-top: 0px;
        transition: margin-top .3s;
        box-shadow: 0 0 10px rgba(0,0,0,0.4);
    }

    .swing-enter {
        margin-top: 210px;
    }

    .swing-leave-active {
        margin-top: 210px;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-leave-active {
        opacity: 0;
    }

</style>
