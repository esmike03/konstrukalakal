<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Trade;
use App\Models\Donate;
use App\Models\Orders;
use App\Models\Archive;
use App\Models\Material;
use Illuminate\Http\Request;
use App\Models\Notifications;

class CartController extends Controller
{
    public function toCart()
    {
        if (!auth()->check()) {
            // Redirect to the login route (trigger login modal)
            return back()->with(
                'message',
                'Please login to add items to your cart.'
            );  // You can also return a custom location for your login modal
        }
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
        $notifcount = Notifications::where('user_id', $logon)->count();
        // $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $cartItemCount = Cart::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $donateItemCount = Donate::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();

        $tradeItemCount = Trade::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $orderItemCount = Orders::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        // $donateItemCount = Donate::where('user_id', auth()->id())->count();
        // $tradeItemCount = Trade::where('user_id', auth()->id())->count();
        // $orderItemCount = Orders::where('user_id', auth()->id())->count();
        $total = $cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount;
        // $cartItems = Cart::with('material') // Eager load the 'material' relationship
        //     ->where('user_id', auth()->id())
        //     ->get();


        $user = auth()->user();
        // dd($user);
        $userId = auth()->id();

        $donate = Cart::with('material', 'user', 'owner')
            ->where(function ($q) use ($user) {
                $q->where('user_id', $user->id)
                    ->orWhere('owner', $user->id);
            })
            ->get();

        $cartItems = Cart::with(['material', 'user', 'owner'])
            ->where('user_id', $user->id)
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->get();



        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        if ($donate->isNotEmpty() && $donate->first()->user_id == $userId) {
            return inertia('Cart', [
                'trades' => $donate,
                'isUser' => True,
                'cartItems' => $cartItems,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
                'notifcount' => $notifcount,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling
            ]);
        } else {

            return inertia('Cart', [
                'trades' => $donate,
                'isUser' => False,
                'cartItems' => $cartItems,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
                'notifcount' => $notifcount,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling
            ]);
        }
    }

    public function todonate()
    {
        $user = auth()->user();
        // dd($user);
        $userId = auth()->id();

        // $donate = Donate::with('material', 'user') ->where(function ($q) use ($user) { $q->where('user_id', $user->id); }) ->get();
        $donate = Donate::with(['material', 'user', 'owner'])
            ->where('user_id', $user->id)
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->get();

        $cartItemCount = Cart::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $donateItemCount = Donate::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();

        $tradeItemCount = Trade::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $orderItemCount = Orders::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $total = $cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount;
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        if ($donate->isNotEmpty() && $donate->first()->user_id == $userId) {
            return inertia('DonateCart', [
                'trades' => $donate,
                'isUser' => True,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
            ]);
        } else {

            return inertia('DonateCart', [
                'trades' => $donate,
                'isUser' => False,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
            ]);
        }
    }

    public function donateList()
    {
        $user = auth()->user();
        // dd($user);
        $userId = auth()->id();

        $donate = Donate::with('material', 'user')
            ->where(function ($q) use ($user) {
                $q->where('owner', $user->id);
            })
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->get();
        $cartItemCount = Cart::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $donateItemCount = Donate::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();

        $tradeItemCount = Trade::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $orderItemCount = Orders::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $total = $cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount;
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
        $donateCount = Donate::where('owner', auth()->id())->whereHas('material', function ($query) {
            $query->where('status', 'on');
        })->count();
        $tradeCount = Trade::where('owner', auth()->id())->whereHas('material', function ($query) {
            $query->where('status', 'on');
        })->count();
        $orderCount = Orders::where('owner', auth()->id())->whereHas('material', function ($query) {
            $query->where('status', 'on');
        })->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);
        if ($donate->isNotEmpty() && $donate->first()->user_id == $userId) {
            return inertia('DonateList', [
                'trades' => $donate,
                'isUser' => True,
                'total' => $total,
                'item' => $item,
                'donate' => $donateCount,
                'trader' => $tradeCount,
                'order' => $orderCount,
                'totaling' => $totaling
            ]);
        } else {

            return inertia('DonateList', [
                'trades' => $donate,
                'isUser' => False,
                'total' => $total,
                'item' => $item,
                'donate' => $donateCount,
                'trader' => $tradeCount,
                'order' => $orderCount,
                'totaling' => $totaling
            ]);
        }
    }

    public function updateQuantity($id, $newQty)
    {


        $material = Material::findOrFail($id);

        $material->quantity = $newQty;
        $material->save();

        return back()->with('message', 'Quantity updated successfully!');
    }


     public function updateQuan($id, $newQty)
    {


        $material = Cart::findOrFail($id);

        $material->quantity = $newQty;
        $material->save();

        return back()->with('message', 'Quantity updated successfully!');
    }

    public function updateQuanDonate($id, $newQty)
    {


        $material = Donate::findOrFail($id);

        $material->quantity = $newQty;
        $material->save();

        return back()->with('message', 'Quantity updated successfully!');
    }



    public function tohistory()
    {
        $user = auth()->user();
        // dd($user);
        $userId = auth()->id();
        $item = Notifications::where('owner', $userId)->latest()->take(5)->get();


        $donate = Archive::with('material', 'user')
            ->where(function ($q) use ($user) {
                $q->where('user_id', $user->id)
                    ->orWhere('owner', $user->id);
            })
            ->get();

        $cartItemCount = Cart::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $donateItemCount = Donate::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();

        $tradeItemCount = Trade::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $orderItemCount = Orders::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $total = ($cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount);

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        if ($donate->isNotEmpty() && $donate->first()->user_id == $userId) {
            return inertia('Archive', [
                'trades' => $donate,
                'isUser' => True,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling
            ]);
        } else {

            return inertia('Archive', [
                'trades' => $donate,
                'isUser' => False,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling
            ]);
        }
    }

    public function tonotifications()
    {

        $logon = auth()->id();

        // Latest 5 for dropdown
        $latestNotifications = Notifications::where('user_id', $logon)
            ->latest()
            ->take(5)
            ->get();

        // All notifications for notifications page
        $not = Notifications::where('user_id', $logon)->first();

        if ($not === $logon) {
            $allNotifications = Notifications::where('user_id', $logon)
                ->latest()
                ->paginate(10); // paginate for better performance
            return Inertia::render('Notifications', [
                'latestNotifications' => $latestNotifications,
                'allNotifications' => $allNotifications,
            ]);
        } else {

            $allNotifications = Notifications::where('owner', $logon)
                ->latest()
                ->paginate(10); // paginate for better performance
            return Inertia::render('Notifications', [
                'latestNotifications' => $latestNotifications,
                'allNotifications' => $allNotifications,
            ]);
        }
    }

    public function toOrders()
    {
        $user = auth()->user();
        // dd($user);
        $userId = auth()->id();
        // dd($userId);
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();

        // $orders = Orders::with('material', 'user')
        //     ->where(function ($q) use ($user) {
        //         $q->where('user_id', $user->id);
        //     })
        //     ->get();

        $orders = Orders::with(['material', 'user', 'owner'])
            ->where('user_id', $user->id)
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->get();



        $cartItemCount = Cart::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $donateItemCount = Donate::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();

        $tradeItemCount = Trade::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $orderItemCount = Orders::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $total = $cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount;

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        if ($orders->isNotEmpty() && $orders->first()->user_id == $userId) {
            return inertia('Orders', [
                'trades' => $orders,
                'isUser' => True,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
            ]);
        } else {

            return inertia('Orders', [
                'trades' => $orders,
                'isUser' => False,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
            ]);
        }
    }

    public function toOrdersCompleted()
    {
        $user = auth()->user();
        // dd($user);
        $userId = auth()->id();
        // dd($userId);
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();

        // $orders = Orders::with('material', 'user')
        //     ->where(function ($q) use ($user) {
        //         $q->where('user_id', $user->id);
        //     })
        //     ->get();

        $orders = Archive::with(['material', 'user', 'owner'])
            ->where('user_id', $user->id)
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->get();



        $cartItemCount = Cart::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $donateItemCount = Donate::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();

        $tradeItemCount = Trade::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $orderItemCount = Orders::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $total = $cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount;

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        if ($orders->isNotEmpty() && $orders->first()->user_id == $userId) {
            return inertia('OrdersCompleted', [
                'trades' => $orders,
                'isUser' => True,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
            ]);
        } else {

            return inertia('OrdersCompleted', [
                'trades' => $orders,
                'isUser' => False,
                'total' => $total,
                'item' => $item,
                'totaling' => $totaling,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
            ]);
        }
    }
    public function toOrderList()
    {
        $user = auth()->user();
        // dd($user);
        $userId = auth()->id();
        // dd($userId);
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
        $orders = Orders::with('material', 'user')
            ->where(function ($q) use ($user) {
                $q->where('owner', $user->id);
            })
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->get();

        $cartItemCount = Cart::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $donateItemCount = Donate::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();

        $tradeItemCount = Trade::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $orderItemCount = Orders::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $total = $cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount;
        $donateCount = Donate::where('owner', auth()->id())->whereHas('material', function ($query) {
            $query->where('status', 'on');
        })->count();
        $tradeCount = Trade::where('owner', auth()->id())->whereHas('material', function ($query) {
            $query->where('status', 'on');
        })->count();
        $orderCount = Orders::where('owner', auth()->id())->whereHas('material', function ($query) {
            $query->where('status', 'on');
        })->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        if ($orders->isNotEmpty() && $orders->first()->user_id == $userId) {
            return inertia('OrderList', [
                'trades' => $orders,
                'isUser' => True,
                'total' => $total,
                'item' => $item,
                'donate' => $donateCount,
                'trader' => $tradeCount,
                'order' => $orderCount,
                'totaling' => $totaling
            ]);
        } else {

            return inertia('OrderList', [
                'trades' => $orders,
                'isUser' => False,
                'total' => $total,
                'item' => $item,
                'donate' => $donateCount,
                'trader' => $tradeCount,
                'order' => $orderCount,
                'totaling' => $totaling
            ]);
        }
    }

    public function add(Request $request)
    {
        if (!auth()->check()) {
            // Redirect to the login route (trigger login modal)
            return back()->with(
                'message',
                'Please login to add items to your cart.'
            );
        }



        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'quantity'    => 'required|integer|min:1',
        ]);
        $owner = Material::where('id', $request->material_id)->first();

        // Check if the material is already in the cart
        $cart = Cart::where('user_id', auth()->id())
            ->where('material_id', $validated['material_id'])
            ->first();
        $notification = Notifications::where('user_id', auth()->id())
            ->where('material_id', $validated['material_id'])
            ->first();

        if ($cart) {
            // If the item exists in the cart, update the quantity
            // $cart->quantity += $validated['quantity'];  // Add the quantity to the existing quantity
            // $cart->save();

            return back()->with('message', 'Material already added to cart!');
        } else {

            $orders = Orders::where('user_id', auth()->id())
                ->where('material_id', $validated['material_id'])
                ->first();

            if ($orders) {
                return back()->with('message', 'Pending Transactions!');
            } else {

                // If the item doesn't exist, create a new cart entry
                Cart::create([
                    'user_id'     => auth()->id(),
                    'material_id' => $validated['material_id'],
                    'quantity'    => $validated['quantity'],
                    'owner' => $owner->user_id,
                ]);

                $user = User::where('id', auth()->id())->first();

                $image = Material::where('id', $validated['material_id'])->first();
                $owner = User::where('id', $image->user_id)->first();

                Notifications::create([
                    'user_id'     => auth()->id(),
                    'material_id' => $validated['material_id'],
                    'quantity'    => $validated['quantity'],
                    'message'    => $user->name . ' added an item to their cart.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $owner->name,
                    'owner' => $owner->id,
                ]);
            }
        }

        return back()->with('message', 'Material added to cart!');
    }

    public function storeDonate(Request $request)
    {
        if (!auth()->check()) {
            // Redirect to the login route (trigger login modal)
            return back()->with(
                'message',
                'Please login to add items to your cart.'
            );
        }
        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'quantity'    => 'required|integer|min:1',
            'user_idx'   => 'required'
        ]);

        // Check if the material is already in the cart
        $cart = Donate::where('user_id', auth()->id())
            ->where('material_id', $validated['material_id'])
            ->first();
        $user = User::where('id', auth()->id())->first();
        $image = Material::where('id', $validated['material_id'])->first();
        $owner = User::where('id', $image->user_id)->first();

        if ($cart) {
            // If the item exists in the cart, update the quantity
            // $cart->quantity += $validated['quantity'];  // Add the quantity to the existing quantity
            // $cart->save();


            if ($cart->status == 'pending') {
                return back()->with('message', 'Pending Transactions!');
            } else if ($cart->status == 'cancelled' || $cart->status == 'rejected') {

                Donate::create([
                    'user_id'     => auth()->id(),
                    'owner'       => $validated['user_idx'],
                    'material_id' => $validated['material_id'],
                    'quantity'    => $validated['quantity'],
                ]);

                Notifications::create([
                    'user_id'     => auth()->id(),
                    'material_id' => $validated['material_id'],
                    'quantity'    => $validated['quantity'],
                    'message'    => $user->name . ' has inquired about your products.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $owner->name,
                    'owner' => $owner->id,
                ]);

                return back()->with('message', 'Inquire successfully!');
            }
        } else {
            // If the item doesn't exist, create a new cart entry
            Donate::create([
                'user_id'     => auth()->id(),
                'owner'       => $validated['user_idx'],
                'material_id' => $validated['material_id'],
                'quantity'    => $validated['quantity'],
            ]);
            Notifications::create([
                'user_id'     => auth()->id(),
                'material_id' => $validated['material_id'],
                'quantity'    => $validated['quantity'],
                'message'    => $user->name . ' has inquired about your products.',
                'username' => $user->name,
                'image' => $image->image,
                'ownername' => $owner->name,
                'owner' => $owner->id,
            ]);

            return back()->with('message', 'Inquire successfully!');
        }
    }


    public function destroy($id)
    {
        // Validate the incoming data
        $cartItem = Cart::findOrFail($id);
        $cartItem->delete();

        if ($cartItem) {
            $cartItem->delete();
        }

        // Optionally, you can return a response with the updated cart data
        return back()->with('message', 'Item removed from cart');
    }

    public function checkout(Request $request)
    {
        $ids = $request->query('items', []);
        $selectedItems = Cart::with('material')
            ->where('user_id', auth()->id())
            ->whereIn('id', $ids)
            ->get();
        $cartItemCount = Cart::where('user_id', auth()->id())->count();

        return Inertia::render('Checkout', [
            'selectedItems' => $selectedItems,
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function storeOrder(Request $request, $id)
    {

        $ids = Cart::findOrFail($id);
        // $cart = Cart::where('id', $ids->material_id)->first();

        // $ownerId = $cart->user_id;

        $materialId = $ids->material_id;

        $userMaterial = Material::where('id', $materialId)->first();
        $materialUser = $userMaterial->user_id;

        if (!auth()->check()) {
            // Redirect to the login route (trigger login modal)
            return back()->with(
                'message',
                'Please login to add items to your cart.'
            );
        }

        if ($ids) {
            Orders::create([
                'user_id'     => auth()->id(),
                'material_id' => $materialId,
                'owner'    => $materialUser,
                'status'      => 'pending',
                'quantity' => $ids->quantity,
            ]);
            $ids->delete();
            return back()->with('message', 'Order placed successfully!');
        }

        return back()->with('message', 'Error Occured!');
    }
}
