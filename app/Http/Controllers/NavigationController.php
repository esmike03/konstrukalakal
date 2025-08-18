<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NavigationController extends Controller
{
    public function toMaterials()
    {
        sleep(1);
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $materials = Material::all();
        return inertia('Materials', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function tradeMaterials()
    {
        sleep(1);
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $materials = Material::where('forbdt', 'Trade')->get();
        return inertia('TradeMaterials', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function buyMaterials()
    {
        sleep(1);
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $materials = Material::where('forbdt', 'Sale')->get();
        return inertia('BuyMaterials', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function donateMaterials()
    {
        sleep(1);
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $materials = Material::where('forbdt', 'Donation')->get();
        return inertia('DonateMaterials', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function about()
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        return inertia('About', [
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function toProfile()
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        return inertia('Profile', [
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function toMessages()
    {
        $me = auth()->id();

        // Get all messages where user is sender or recipient
        $msgs = \App\Models\Message::where(function ($q) use ($me) {
            $q->where('sender_id', $me)
                ->orWhere('recipient_id', $me);
        })
            ->orderBy('created_at', 'desc')
            ->get();

        // Group by conversation (start)
        $groups = $msgs->groupBy('start');

        $conversations = $groups->map(function ($msgs) use ($me) {
            $last = $msgs->first(); // newest message because of desc order

            // Find the "other" user in this conversation
            $other = $last->sender_id === $me
                ? $last->recipient
                : $last->sender;

            return [
                'conversation_id' => $last->start,   // unique id for thread
                'user'            => $other,         // the other user
                'last_message'    => $last,          // preview
                'material_id'     => $last->material_id, // related item
                'material_name'   => optional($last->material)->material_name,
                'material_image'   => optional($last->material)->image,
            ];
        })->values();

        $cartItemCount = Cart::where('user_id', $me)->count();

        return inertia('Message', [
            'cartItemCount' => $cartItemCount,
            'conversations' => $conversations,
        ]);
    }


    public function materialStore(Request $request)
    {
        sleep(0.5);
        $request->validate([
            'materialName' => 'required|string',
            'location' => 'required|string',
            'category' => 'required|string',
            'condition' => 'required|string',
            'forbdt' => 'required|string',
            'availability' => 'required|string',
            'price' => [
                'nullable',
                'numeric',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->forbdt === 'Sale' && (is_null($value) || $value === '')) {
                        $fail('The price field is required for items for sale.');
                    }
                }
            ],
            'quantity' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048', // Validate image
        ]);

        // Handle file upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('materials', 'public'); // Save to storage/app/public/materials
        }

        // Create material
        Material::create([
            'user_id' => Auth::id(),
            'material_name' => $request->materialName,
            'location' => $request->location,
            'category' => $request->category,
            'condition' => $request->condition,
            'forbdt' => $request->forbdt,
            'availability' => $request->availability,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'description' => $request->description,
            'image' => $imagePath, // Store image path
        ]);

        return back()->with('message', 'Uploaded successfully!');
    }

    public function uploadedMaterials()
    {
        sleep(1);
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $materials = Material::where('user_id', auth()->id())->get();
        return inertia('Uploads', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
        ]);
    }
}
