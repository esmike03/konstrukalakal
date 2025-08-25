<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Donate;
use App\Models\Orders;
use Illuminate\Http\Request;

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
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $cartItems = Cart::with('material') // Eager load the 'material' relationship
            ->where('user_id', auth()->id())
            ->get();

        return inertia('Cart', [
            'cartItems' => $cartItems,
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function todonate()
    {
        $user = auth()->user();
        // dd($user);
        $userId = auth()->id();

        $donate = Donate::with('material', 'user')
            ->where(function ($q) use ($user) {
                $q->where('user_id', $user->id)
                    ->orWhere('owner', $user->id);
            })
            ->get();



        if ($donate->first()->user_id == $userId) {
            return inertia('DonateCart', [
                'trades' => $donate,
                'isUser' => True,
            ]);
        } else {

            return inertia('DonateCart', [
                'trades' => $donate,
                'isUser' => False,
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

        // Check if the material is already in the cart
        $cart = Cart::where('user_id', auth()->id())
            ->where('material_id', $validated['material_id'])
            ->first();

        if ($cart) {
            // If the item exists in the cart, update the quantity
            $cart->quantity += $validated['quantity'];  // Add the quantity to the existing quantity
            $cart->save();
        } else {
            // If the item doesn't exist, create a new cart entry
            Cart::create([
                'user_id'     => auth()->id(),
                'material_id' => $validated['material_id'],
                'quantity'    => $validated['quantity'],
            ]);
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

        if ($cart) {
            // If the item exists in the cart, update the quantity
            // $cart->quantity += $validated['quantity'];  // Add the quantity to the existing quantity
            // $cart->save();
            return back()->with('message', 'Pending Transactions!');
        } else {
            // If the item doesn't exist, create a new cart entry
            Donate::create([
                'user_id'     => auth()->id(),
                'owner'       => $validated['user_idx'],
                'material_id' => $validated['material_id'],
                'quantity'    => $validated['quantity'],
            ]);
            return back()->with('message', 'Material added to cart!');
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

    public function storeOrder(Request $request)
    {

        if (!auth()->check()) {
            // Redirect to the login route (trigger login modal)
            return back()->with(
                'message',
                'Please login to add items to your cart.'
            );
        }
        $validated = $request->validate([
            'items'   => 'required|array',
            'items.*' => 'exists:carts,id',
        ]);

        foreach ($validated['items'] as $cartId) {
            $cartItem = Cart::where('id', $cartId)
                ->where('user_id', auth()->id())
                ->first();

            if ($cartItem) {
                Orders::create([
                    'user_id'     => auth()->id(),
                    'material_id' => $cartItem->material_id,
                    'owner'    => $cartItem->material_id->id,
                    'status'      => 'pending',
                ]);
            }
        }

        return back()->with('message', 'Order placed successfully!');
    }
}
