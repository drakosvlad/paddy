<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('login', ['uses' => 'AuthController@login']);
    Route::post('register', ['uses' => 'AuthController@register']);
    Route::post('logout', ['uses' => 'AuthController@logout']);
    Route::post('refresh', ['uses' => 'AuthController@refresh']);
    Route::get('me', ['uses' => 'AuthController@me']);
});

Route::get('lol', function () {
    return "kek";
});

Route::resource('passwords', 'PasswordController');