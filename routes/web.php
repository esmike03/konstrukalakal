<?php

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\NavigationController;

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

Route::get('/materials/{id}', [MaterialController::class, 'show'])->name('materials.show');

Route::get('/back', [MaterialController::class, 'back'])->name('materials.back');

Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');

Route::get('/cart', [CartController::class, 'toCart']);
Route::get('/cart/delete/{id}', [CartController::class, 'destroy'])->name('cart.delete');

Route::post('/profile/update-image', [ProfileController::class, 'updateProfileImage'])->middleware('auth');
