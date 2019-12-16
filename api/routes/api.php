<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user()->only('id', 'name', 'api_token');
});

Route::apiResource('/todos', 'TodoController')->middleware('auth:api');

Route::post('/auth/register', 'AuthController@register');
Route::post('/auth/login', 'AuthController@login');

Route::get('/categories', 'CategoryController@index');
