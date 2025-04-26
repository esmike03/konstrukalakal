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
        $materials = Material::where('forbdt', 'Donate')->get();
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


        $me = auth()->user()->id;

        // Fetch all messages where user is sender or recipient
        $msgs = \App\Models\Message::where('sender_id', $me)
            ->orWhere('recipient_id', $me)
            ->orderBy('created_at', 'desc')
            ->get();

        // Group by the other user
        $groups = $msgs->groupBy(function ($msg) use ($me) {
            return $msg->sender_id === $me
                ? $msg->recipient_id
                : $msg->sender_id;
        });

        $conversations = $groups->map(function ($msgs, $otherUserId) {
            $last = $msgs->first(); // because we ordered desc
            $other = $last->sender_id === auth()->id()
                ? $last->recipient
                : $last->sender;
            return [
                'user'          => $other,
                'last_message'  => $last,
                'material_id'   => $last->material_id,
            ];
        })->values();

        $cartItemCount = Cart::where('user_id', auth()->id())->count();
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
            'price' => 'required|numeric',
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
