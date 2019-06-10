<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Paddy</title>

        <!-- Fonts -->
        <link href="/css/app.css" rel="stylesheet" />
    </head>
    <body>
        <div id="app">
            <div class="header">
                <span class="logo">Paddy</span>
                <button v-if="isAuthorized" class="btn" id="button-secondary-white" @click="logout">Log out</button>
            </div>
            <div class="notifications align-center">
                <transition name="fade">
                    <message-component v-for="(message, index) in messages" :key="index" :message="message" v-if="message.active"></message-component>
                </transition>
            </div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>
