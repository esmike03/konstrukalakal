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
use App\Http\Controllers\UserController;
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

Route::get('/trash-bin', [NavigationController::class, 'Bin']);


Route::get('/profile', [NavigationController::class, 'toProfile']);
Route::get('/messages', [NavigationController::class, 'toMessages']);

Route::get('/materials/{id}', [MaterialController::class, 'show'])->name('materials.show');
Route::get('/materials-edit/{id}', [MaterialController::class, 'editMaterial'])->name('materials.edit');

Route::get('/message/{id}', [MaterialController::class, 'sendMessage'])->name('message.show');
Route::get('/message2/{start}', [MaterialController::class, 'sendMessage2'])->name('sendMessage2');
Route::get('/message2x/{start}', [MaterialController::class, 'fetchMessages']);

Route::post('/messages/send', [MaterialController::class, 'send']);
Route::get('/messagext/{id}', [MaterialController::class, 'sendMessagex'])->name('messagex.showx');
Route::get('/messagex/{id}/{userId}', [MaterialController::class, 'sendMessagexx'])->name('messagexx.showxx');
Route::get('/back', [MaterialController::class, 'back'])->name('materials.back');
Route::get('/messagexx/{id}/{userId}', [MaterialController::class, 'sendMessagexxx'])->name('messagexxx.showxxx');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/donate/submit', [CartController::class, 'storeDonate']);

Route::post('/order/{id}/submit', [CartController::class, 'storeOrder'])->name('order');

Route::get('/cart', [CartController::class, 'toCart']);
Route::get('/cart/donate', [CartController::class, 'todonate']);
Route::get('/donate-list', [CartController::class, 'donateList']);
Route::get('/history', [CartController::class, 'tohistory']);
Route::get('/notifications', [CartController::class, 'tonotifications']);
Route::post('/cart/delete/{id}', [CartController::class, 'destroy'])->name('cart.delete');
Route::get('/uploads/delete/{id}', [MaterialController::class, 'uploadDestroy'])->name('upload.delete');
Route::get('/uploads/restore/{id}', [MaterialController::class, 'uploadRestore'])->name('upload.restore');
Route::get('/Orders', [CartController::class, 'toOrders']);
Route::get('/order-list', [CartController::class, 'toOrderList']);
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
Route::get('/trade-list', [MaterialController::class, 'TradeList'])->middleware('auth');
Route::post('/trades/{id}/reject', [NavigationController::class, 'rejectTrade'])->name('trades.rejectTrade');
Route::post('/trades/{id}/cancel', [NavigationController::class, 'cancelTrade'])->name('trades.cancelTrade');
Route::post('/trades/{id}/accept', [NavigationController::class, 'acceptTrade'])->name('trades.acceptTrade');
Route::post('/trades/{id}/complete', [NavigationController::class, 'completeTrade'])->name('trades.completeTrade');

//Donate
Route::post('/donate/{id}/reject', [NavigationController::class, 'rejectDonate'])->name('trades.rejectDonate');
Route::post('/donate/{id}/cancel', [NavigationController::class, 'cancelDonate'])->name('trades.cancelDonate');
Route::post('/donate/{id}/accept', [NavigationController::class, 'acceptDonate'])->name('trades.acceptDonate');
Route::post('/donate/{id}/complete', [NavigationController::class, 'completeDonate'])->name('trades.completeDonate');

//ORders
Route::post('/order/{id}/reject', [NavigationController::class, 'rejectOrder'])->name('trades.rejectOrder');
Route::post('/order/{id}/cancel', [NavigationController::class, 'cancelOrder'])->name('trades.cancelOrder');
Route::post('/order/{id}/accept', [NavigationController::class, 'acceptOrder'])->name('trades.acceptOrder');
Route::post('/order/{id}/complete', [NavigationController::class, 'completeOrder'])->name('trades.completeOrder');
Route::post('/order/{id}/cancelbyowner', [NavigationController::class, 'cancelbyOwnerOrder'])->name('trades.cancelOwnerOrder');



//update the quantity
Route::post('/cart/updateQuantity/{id}/{newQty}', [CartController::class, 'updateQuantity']);

Route::post('/cart/update/{id}/{newQty}', [CartController::class, 'updateQuan']);
Route::post('/cart/update-donate/{id}/{newQty}', [CartController::class, 'updateQuanDonate']);

Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
Route::get('/admin/reported', [UserController::class, 'reported'])->name('admin.reported');
Route::get('/admin/reported-item', [UserController::class, 'reportedItem'])->name('admin.reported-item');
Route::delete('/admin/users/{id}', [UserController::class, 'destroyuser'])->name('admin.users.destroy');

Route::get('/direct/{id}/{user}', [MaterialController::class, 'sendDirect'])->name('direct.show');
Route::get('/profile-view/{user}', [NavigationController::class, 'ProfileView']);
Route::get('/conversation/delete/{id}', [MaterialController::class, 'convoDestroy'])->name('conversation.delete');
Route::get('/disable/{id}', [MaterialController::class, 'userDisable'])->name('disable.user');
Route::get('/enable/{id}', [MaterialController::class, 'userEnable'])->name('enable.user');
Route::post('/report-user', [PostController::class, 'Reported'])->name('report.store');
Route::post('/report-item', [PostController::class, 'ReportedItem'])->name('report.item');
Route::post('/block-user', [PostController::class, 'BlockUser'])->name('block.user');
Route::post('/unblock-user', [PostController::class, 'UnblockUser'])->name('unblock.user');
