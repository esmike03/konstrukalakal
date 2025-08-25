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

Route::get('/materials', [NavigationController::class, 'toMaterials'])->name('material.tradex');
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
Route::get('/uploaded', [NavigationController::class, 'uploadedMaterials']);


Route::get('/profile', [NavigationController::class, 'toProfile']);
Route::get('/messages', [NavigationController::class, 'toMessages']);

Route::get('/materials/{id}', [MaterialController::class, 'show'])->name('materials.show');
Route::get('/materials-edit/{id}', [MaterialController::class, 'editMaterial'])->name('materials.edit');

Route::get('/message/{id}', [MaterialController::class, 'sendMessage'])->name('message.show');
Route::get('/message2/{start}', [MaterialController::class, 'sendMessage2'])->name('message2.show');
Route::post('/messages/send', [MaterialController::class, 'send']);
Route::get('/messagex/{id}', [MaterialController::class, 'sendMessagex'])->name('messagex.showx');
Route::get('/messagex/{id}/{userId}', [MaterialController::class, 'sendMessagexx'])->name('messagexx.showxx');
Route::get('/back', [MaterialController::class, 'back'])->name('materials.back');
Route::get('/messagexx/{id}/{userId}', [MaterialController::class, 'sendMessagexxx'])->name('messagexxx.showxxx');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/donate/submit', [CartController::class, 'storeDonate']);

Route::post('/order/submit', [CartController::class, 'storeOrder'])->name('order');

Route::get('/cart', [CartController::class, 'toCart']);
Route::get('/cart/donate', [CartController::class, 'todonate']);
Route::get('/cart/delete/{id}', [CartController::class, 'destroy'])->name('cart.delete');
Route::get('/uploads/delete/{id}', [MaterialController::class, 'uploadDestroy'])->name('upload.delete');
Route::get('/Orders', [CartController::class, 'toOrders']);
Route::post('/profile/update-image', [ProfileController::class, 'updateProfileImage'])->middleware('auth');

Route::put('/materials-update/{material}', [MaterialController::class, 'updateMaterial'])
     ->name('materials.update');

Route::post('/profile/update', [ProfileController::class, 'update'])
     ->name('profile.update');

Route::get('/checkout', [CartController::class, 'checkout'])->middleware('auth');

//Trades
Route::get('/trade/create', [MaterialController::class, 'createTrade'])->name('trade.create');
Route::post('/trade/submit', [MaterialController::class, 'storeTrade']);
Route::get('/my-trades', [MaterialController::class, 'myTrades'])->middleware('auth');
Route::post('/trades/{id}/reject', [NavigationController::class, 'rejectTrade'])->name('trades.rejectTrade');
Route::post('/trades/{id}/cancel', [NavigationController::class, 'cancelTrade'])->name('trades.cancelTrade');
Route::post('/trades/{id}/accept', [NavigationController::class, 'acceptTrade'])->name('trades.acceptTrade');

//Donate
Route::post('/donate/{id}/reject', [NavigationController::class, 'rejectDonate'])->name('trades.rejectDonate');
Route::post('/donate/{id}/cancel', [NavigationController::class, 'cancelDonate'])->name('trades.cancelDonate');
Route::post('/donate/{id}/accept', [NavigationController::class, 'acceptDonate'])->name('trades.acceptDonate');

//ORders
Route::post('/order/{id}/reject', [NavigationController::class, 'rejectOrder'])->name('trades.rejectOrder');
Route::post('/order/{id}/cancel', [NavigationController::class, 'cancelOrder'])->name('trades.cancelOrder');
Route::post('/order/{id}/accept', [NavigationController::class, 'acceptOrder'])->name('trades.acceptOrder');
