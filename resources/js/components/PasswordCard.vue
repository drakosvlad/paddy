<template>
    <div class="col-12 col-md-6 col-lg-4">
        <div class="password-card" @click="cardClick">
            <span v-if="name != undefined"><img class="password-icon" src="../../images/rubbish-bin.png" alt="delete password" @click="clickDelete"></span>
            <span v-if="name != undefined"><img class="password-icon" src="../../images/pencil-outline.png" alt="delete password" @click="clickEdit"></span>
            <p v-if="name != undefined" class="acc-name" @click="click">{{ name }}</p>
            <br v-if="name != undefined" />
            <p class="acc-username" v-if="name != undefined">Username: <i>{{ username }}</i></p>
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

        .acc-name {
            color: $friendly-blue-50;
            font-size: 24px;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            margin-bottom: 0;
            cursor: pointer;
        }

        .acc-username {
            font-size: 18px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            margin-bottom: 0;
            margin-top: -18px;
        }

        .svg-icon {
            padding: 15px;
            height: 100%;
            margin: auto;
            display: block;
            fill: $focused-gray-50;
            cursor: pointer;
        }

        .password-icon {
            float: right;
            height: 32px;
            margin: 0 5px;
            cursor: pointer;
        }
    }

</style>
