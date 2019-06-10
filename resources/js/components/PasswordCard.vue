<template>
    <div class="col-12 col-md-6 col-lg-4">
        <div class="password-card" @click="cardClick">
            <span v-if="name != undefined"><img class="password-icon" src="../../images/rubbish-bin.png" alt="delete password" @click="clickDelete"></span>
            <span v-if="name != undefined"><img class="password-icon" src="../../images/pencil-outline.png" alt="delete password" @click="clickEdit"></span>
            <span v-if="name != undefined" class="acc-name" @click="click">{{ name }}</span>
            <br v-if="name != undefined" />
            <span class="acc-username" v-if="name != undefined">Username: <i>{{ username }}</i></span>
            <svg v-else class="svg-icon" viewBox="0 0 25 25">
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Password",
        props: ["name", "username"],
        methods: {
            click() {
                this.$emit('click');
            },
            clickEdit() {
                this.$emit('edit');
            },
            clickDelete() {
                this.$emit('delete');
            },
            cardClick() {
                if (this.name === undefined) {
                    this.$emit('click');
                }
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
        cursor: pointer;

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
