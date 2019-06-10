<template>
    <div class="col-12 col-md-6 col-lg-4" @click="click">
        <div class="password-card">
            <a href="#" v-if="name != undefined"><img class="password-icon" src="../../images/rubbish-bin.png" alt="delete password"></a>
            <a href="#" v-if="name != undefined"><img class="password-icon" src="../../images/pencil-outline.png" alt="delete password"></a>
            <a href="#" class="acc-name" v-if="name != undefined">{{ name }}</a>
            <br v-if="name != undefined" />
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
        margin: 10px 0;
        padding: 10px;
        box-shadow: $shadow;
        height: 90px;

        .acc-name {
            color: $friendly-blue-50;
            font-size: 24px;
            font-weight: bold;
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

        .password-icon {
            float: right;
            height: 32px;
            margin: 0 5px;
        }
    }

</style>
