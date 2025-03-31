<?php

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NavigationController;
use App\Http\Controllers\PostController;

// Route::get('/', function () {
//     sleep(4);
//     return Inertia::render('Home', ['name' => 'Mike']);
// });

// Route::inertia('/', 'Home');
Route::get('/', [PostController::class, 'index']);

Route::get('/materials', [NavigationController::class, 'toMaterials']);
Route::post('/materials/store', [NavigationController::class, 'materialStore']);

Route::resource('posts', PostController::class)->except('index');

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/')->with('message', 'Logout successfully! ');
});

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::get('/about', [NavigationController::class, 'about'])->name('about');

Route::get('/trade-materials', [NavigationController::class, 'tradeMaterials']);
Route::get('/buy-materials', [NavigationController::class, 'buyMaterials']);
Route::get('/donate-materials', [NavigationController::class, 'donateMaterials']);

Route::get('/profile', [NavigationController::class, 'toProfile']);
