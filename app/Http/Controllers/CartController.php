<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add(Request $request)
    {

        if (!auth()->check()) {
            // Redirect to the login route (trigger login modal)
            return back()->with(
                'message', 'Please login to add items to your cart.'
            );  // You can also return a custom location for your login modal
        }

        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Assuming you have a Cart model with user_id, material_id, quantity fields
        $cart = Cart::updateOrCreate(
            [
                'user_id'     => auth()->id(),
                'material_id' => $validated['material_id'],
            ],
            [
                'quantity'    => \DB::raw("quantity + {$validated['quantity']}"),
            ]
        );

        // If the cart item doesn't exist, you might want to create it instead:
        // $cart = Cart::create([
        //     'user_id'     => auth()->id(),
        //     'material_id' => $validated['material_id'],
        //     'quantity'    => $validated['quantity'],
        // ]);

        return back()->with('message', 'Material added to cart!');
    }
}
