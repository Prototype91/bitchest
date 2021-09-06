<?php

use App\Http\Controllers\CurrenciesController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TransactionsController;
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

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::post('login', [LoginController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Logout
    Route::post('/logout', [LoginController::class, 'logout']);
/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
*/
    Route::get('/users', [UsersController::class, 'index']);
    Route::get('/user/{id}', [UsersController::class, 'show']);
    Route::post('/user', [UsersController::class, 'store']);


    Route::delete('/user/{id}', [UsersController::class, 'destroy']);
    Route::put('/loggedUser/{id}', [UsersController::class, 'updateLoggedUser']);
    Route::put('/user/{id}', [UsersController::class, 'update']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
/*
|--------------------------------------------------------------------------
| Transactions Routes
|--------------------------------------------------------------------------
*/
    Route::get('/transactions/user/{id}', [UsersController::class, 'getTransactionsByUserId']);
    Route::post('/transactions', [TransactionsController::class, 'store']);
    Route::put('/transactions/{name}', [TransactionsController::class, 'updateTransactions']);

/*
|--------------------------------------------------------------------------
| Currencies Routes
|--------------------------------------------------------------------------
*/
    Route::get('/currencies', [CurrenciesController::class, 'index']);
});
