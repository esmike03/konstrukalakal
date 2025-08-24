<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Trade;
use App\Models\Donate;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NavigationController extends Controller
{
    public function toMaterials()
    {
        sleep(1);
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $materials = Material::where('status', 'on')->get();
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
        $materials = Material::where('forbdt', 'Donation')
        ->where('status', 'on')
        ->get();
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
            $other = $last->_id === $me
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


    //Trade function
    public function rejectTrade($id)
    {
        $trade = Trade::findOrFail($id);


        $trade->update(['status' => 'rejected']);

        return redirect()->back()->with('message', 'Trade rejected successfully!');
    }

    public function cancelTrade($id)
    {
        $trade = Trade::findOrFail($id);

        $trade->update(['status' => 'cancelled']);

        return redirect()->back()->with('message', 'Trade cancelled successfully!');
    }

    // public function acceptTrade($id)
    // {
    //     $trade = Trade::findOrFail($id);

    //     // ✅ Step 1: Accept the selected trade
    //     $trade->update(['status' => 'accepted']);

    //     // ✅ Step 2: Reject all other trades with the same trade_for
    //     Trade::where('trade_for', $trade->trade_for)
    //         ->where('id', '!=', $trade->id)
    //         ->update(['status' => 'rejected']);

    //     return back()->with('message', 'Trade accepted successfully.');
    // }

    public function acceptTrade($id)
    {
        $trade = Trade::findOrFail($id);

        // ✅ Accept this trade
        $trade->update(['status' => 'accepted']);

        // ✅ Reject all other trades with the same trade_for
        Trade::where('trade_for', $trade->trade_for)
            ->where('id', '!=', $trade->id)
            ->update(['status' => 'rejected']);


        $authId = auth()->id();
        $otherUserId = $trade->user_id; // user you're trading with
        $materialId = $trade->trade_for;

        // check if conversation already exists between these users for this material
        $existingMessage = \App\Models\Message::where('material_id', $materialId)
            ->where(function ($q) use ($authId, $otherUserId) {
                $q->where(function ($q2) use ($authId, $otherUserId) {
                    $q2->where('sender_id', $authId)
                        ->where('recipient_id', $otherUserId);
                })->orWhere(function ($q2) use ($authId, $otherUserId) {
                    $q2->where('sender_id', $otherUserId)
                        ->where('recipient_id', $authId);
                });
            })
            ->first();

        if ($existingMessage) {
            // continue conversation (insert new message with same start key)
            \App\Models\Message::create([
                'start' => $existingMessage->start,
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Trade accepted successfully!',
            ]);
        } else {
            // start new conversation
            \App\Models\Message::create([
                'start' => \Illuminate\Support\Str::uuid(),
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Trade accepted successfully!',
            ]);
            Material::where('id', $trade->trade_for)->update(['status' => 'off']);
            return back()->with('message', 'Trade accepted and message sent.');
        }
    }

    //Donate

    public function rejectDonate($id)
    {
        $trade = Donate::findOrFail($id);


        $trade->update(['status' => 'rejected']);

        return redirect()->back()->with('message', 'Inquiry rejected successfully!');
    }

    public function cancelDonate($id)
    {
        $trade = Donate::findOrFail($id);

        $trade->update(['status' => 'cancelled']);

        return redirect()->back()->with('message', 'Inquiry cancelled successfully!');
    }

        public function acceptDonate($id)
    {
        $trade = Donate::findOrFail($id);

        // ✅ Accept this trade
        $trade->update(['status' => 'accepted']);

        // ✅ Reject all other trades with the same trade_for
        Donate::where('material_id', $trade->material_id)
            ->where('id', '!=', $trade->id)
            ->update(['status' => 'rejected']);



        $authId = auth()->id();
        $otherUserId = $trade->user_id; // user you're trading with
        $materialId = $trade->material_id;

        // check if conversation already exists between these users for this material
        $existingMessage = \App\Models\Message::where('material_id', $materialId)
            ->where(function ($q) use ($authId, $otherUserId) {
                $q->where(function ($q2) use ($authId, $otherUserId) {
                    $q2->where('sender_id', $authId)
                        ->where('recipient_id', $otherUserId);
                })->orWhere(function ($q2) use ($authId, $otherUserId) {
                    $q2->where('sender_id', $otherUserId)
                        ->where('recipient_id', $authId);
                });
            })
            ->first();

        if ($existingMessage) {
            // continue conversation (insert new message with same start key)
            \App\Models\Message::create([
                'start' => $existingMessage->start,
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Inquiry accepted successfully!',
            ]);
        } else {
            // start new conversation
            \App\Models\Message::create([
                'start' => \Illuminate\Support\Str::uuid(),
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Inquiry accepted successfully!',
            ]);
            Material::where('id', $trade->material_id)->update(['status' => 'off']);
            return back()->with('message', 'Inquiry accepted and message sent.');
        }
    }
}
