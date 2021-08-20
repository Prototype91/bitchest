<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Login
Route::post('login', [LoginController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function() {
    // Logout
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/add', [UsersController::class, 'store']);
    Route::delete('/user/{id}', [UsersController::class, 'destroy']);
    Route::put('/user/update/{id}', [UsersController::class, 'update']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', [UsersController::class, 'index']);
});
