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
            </div>
            <router-view></router-view>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>
