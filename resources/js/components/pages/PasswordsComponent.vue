<template>
    <div class="container">
        <h1>Passwords</h1>
        <div class="row">
            <password-card v-for="(password, index) in passwords" :key="index" :name="password.name"></password-card>
            <password-card></password-card>
        </div>
    </div>
</template>

<script>
    import PasswordCard from '../PasswordCard';

    export default {
        name: "PasswordsComponent",
        components: {
            PasswordCard
        },
        computed: {
            passwords() {
                console.log(this.$store.state.passwords);
                return this.$store.state.passwords;
            }
        },
        created() {
            //this.$store.dispatch("addPassword");
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/_variables.scss";

</style>
