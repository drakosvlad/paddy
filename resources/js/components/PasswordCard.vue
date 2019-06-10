<template>
    <div class="col-12 col-sm-6 col-md-4" @click="click">
        <div class="password-card">
            <span class="acc-name" v-if="name != undefined">{{ name }}</span>
            <span class="acc-username" v-if="name != undefined">Username: <i>{{ name }}</i></span>
            <svg v-else class="svg-icon" viewBox="0 0 25 25">
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
            </svg>


        </div>
    </div>
</template>

<script>
    export default {
        name: "Password",
        props: ["name"],
        methods: {
            click() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/_variables.scss";

    .password-card {
        border-radius: $card-border-radius;
        background: white;
        margin: 5px;
        padding: 10px;
        box-shadow: $shadow;
        height: 90px;
        cursor: pointer;

        .acc-name {
            color: $friendly-blue-50;
            font-size: 24px;
            font-weight: bold;
            display: block;
        }

        .acc-username {
            font-size: 18px;
        }

        .svg-icon {
            padding: 15px;
            height: 100%;
            margin: auto;
            display: block;
            fill: $focused-gray-50;
        }
    }
</style>
