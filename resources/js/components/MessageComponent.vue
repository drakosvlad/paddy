<template>
    <div :class="['alert', { 'alert-danger': message.error, 'alert-primary': !message.error }]" role="alert">
        {{ message.text }}
    </div>
</template>

<script>
    export default {
        name: "MessageComponent",
        props: ["message"],
        methods: {
            
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/_variables.scss";

    div {
        @media (max-width: 768px) {
            width: calc(100% - 20px);
        }

        @media (min-width: 769px) {
            width: 500px;
        }

        margin: 0 auto;
        z-index: 1000;
        opacity: 1;
        transition: opacity .5s;
    }
</style>
