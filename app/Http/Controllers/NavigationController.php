<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Trade;
use App\Models\Donate;
use App\Models\User;
use App\Models\Orders;
use App\Models\Archive;
use App\Models\Material;
use Illuminate\Http\Request;
use App\Models\Notifications;
use Illuminate\Support\Facades\Auth;

class NavigationController extends Controller
{
    public function toMaterials()
    {
        sleep(1);
        $logon = auth()->id();
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

        $materials = Material::where('status', 'on')->get();
        $notifcount = Notifications::where('user_id', $logon)->count();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
        return inertia('Materials', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
            'total' => $total,
            'item' => $item,
            'totaling' => $totaling,
            'notifcount' => $notifcount,
        ]);
    }

    public function tradeMaterials()
    {
        sleep(1);
        $logon = auth()->id();
        $notifcount = Notifications::where('user_id', $logon)->count();
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

        $materials = Material::where('forbdt', 'Trade')->get();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
        return inertia('TradeMaterials', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
            'notifcount' => $notifcount,
            'item' => $item,
            'totaling' => $totaling,
            'total' => $total
        ]);
    }

    public function buyMaterials()
    {
        sleep(1);
        $logon = auth()->id();
        $notifcount = Notifications::where('user_id', $logon)->count();
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

        $materials = Material::where('forbdt', 'Sale')->get();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
        return inertia('BuyMaterials', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
            'notifcount' => $notifcount,
            'item' => $item,
            'totaling' => $totaling,
            'total' => $total
        ]);
    }

    public function donateMaterials()
    {
        sleep(1);
        $logon = auth()->id();
        $notifcount = Notifications::where('user_id', $logon)->count();
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
        $materials = Material::where('forbdt', 'Donation')
        ->where('status', 'on')
        ->get();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);
        return inertia('DonateMaterials', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
            'notifcount' => $notifcount,
            'item' => $item,
            'totaling' => $totaling,
            'total' => $total
        ]);
    }

    public function about()
    {
        $logon = auth()->id();
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
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);
        return inertia('About', [
            'cartItemCount' => $cartItemCount,
            'total' => $total,
            'totaling' => $totaling,
            'item' => $item,
        ]);
    }

    public function toProfile()
    {
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
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

        return inertia('Profile', [
            'cartItemCount' => $cartItemCount,
            'total' => $total,
            'item' => $item,
            'totaling' => $totaling
        ]);
    }

    public function toMessages()
    {
        $me = auth()->id();
        $logon = auth()->id();

        // Get all messages where user is sender or recipient
        $msgs = \App\Models\Convo::where(function ($q) use ($me) {
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

            if($last->recipient_id === $me){
                $other = $last->_id == $me
                ? $last->sender
                : $last->sender;

                return [
                'conversation_id' => $last->start,   // unique id for thread
                'user'            => $other,         // the other user
                'last_message'    => $last,          // preview
                'material_id'     => $last->material_id, // related item
                'material_name'   => optional($last->material)->material_name,
                'material_image'   => optional($last->material)->image,
                'status'   => optional($last->material)->status,

                ];
            }else{
                $other = $last->_id != $me
                ? $last->recipient
                : $last->recipient;

                return [
                'conversation_id' => $last->start,   // unique id for thread
                'user'            => $other,         // the other user
                'last_message'    => $last,          // preview
                'material_id'     => $last->material_id, // related item
                'material_name'   => optional($last->material)->material_name,
                'material_image'   => optional($last->material)->image,
                'status'   => optional($last->material)->status,
                ];
            }



        })->values();


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
        $notifcount = Notifications::where('user_id', $logon)
                    ->orWhere('owner', $logon)->count();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        return inertia('Message', [
            'cartItemCount' => $cartItemCount,
            'conversations' => $conversations,
            'total' => $total,
            'item' => $item,
            'totaling' => $totaling,
            'notifcount' =>$notifcount,

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
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
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

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        $total = ($cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount);
        $materials = Material::where('user_id', auth()->id())
                    ->where('status', 'on')->get();
        return inertia('Uploads', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
             'donate' => $donateCount,
             'trade' => $tradeCount,
             'order' => $orderCount,
            'total' => $total,
            'item' => $item,
        ]);
    }

    public function Bin()
    {
        sleep(1);
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
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

        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

        $total = ($cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount);
        $materials = Material::where('user_id', auth()->id())
                    ->where('status', 'off')->get();
        return inertia('Bin', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount,
             'donate' => $donateCount,
             'trade' => $tradeCount,
             'order' => $orderCount,
            'total' => $total,
            'item' => $item,
        ]);
    }


    //Trade function
    public function rejectTrade($id)
    {
        $trade = Trade::findOrFail($id);
        $user = User::where('id', $trade->owner)->first();
        $image = Material::where('id', $trade->material_id)->first();
        // $trade->update(['status' => 'rejected']);
        Archive::create([
                    'user_id'     => $trade->user_id,
                    'users' => auth()->id(),
                    'material_id' => $trade->trade_for,
                    'owner'    => $trade->owner,
                    'status'      => 'rejected',
                    'item_title' => $trade->item_title,
                    'item_image' => $trade->item_image
        ]);

        Notifications::create([
                    'user_id'     => $user->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your trade has been rejected.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user->name,
                    'owner' => $user->id,
                ]);
        $trade->delete();

        return redirect()->back()->with('message', 'Trade rejected successfully!');
    }

    public function cancelTrade($id)
    {
        $trade = Trade::findOrFail($id);

        // $trade->update(['status' => 'cancelled']);
        $user = User::where('id', $trade->owner)->first();
        $image = Material::where('id', $trade->material_id)->first();
        Archive::create([
                    'user_id'     => $trade->user_id,
                    'users' => auth()->id(),
                    'material_id' => $trade->trade_for,
                    'owner'    => $trade->owner,
                    'status'      => 'rejected',
                    'item_title' => $trade->item_title,
                    'item_image' => $trade->item_image
        ]);

        Notifications::create([
                    'user_id'     => $user->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your trade has been cancelled.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user->name,
                    'owner' => $user->id,
                ]);
        $trade->delete();

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

        // $trade->update(['status' => 'rejected']);

        Archive::create([
                    'user_id'     => $trade->user_id,
                    'users' => auth()->id(),
                    'material_id' => $trade->material_id,
                    'owner'    => $trade->owner,
                    'status'      => 'rejected',
        ]);
        $trade->delete();

        return redirect()->back()->with('message', 'Inquiry rejected successfully!');
    }

    public function cancelDonate($id)
    {
        $trade = Donate::findOrFail($id);

        // $trade->update(['status' => 'cancelled']);
        $user = User::where('id', $trade->owner)->first();
        $image = Material::where('id', $trade->material_id)->first();
        Archive::create([
                    'user_id'     => $trade->user_id,
                    'users' => auth()->id(),
                    'material_id' => $trade->material_id,
                    'owner'    => $trade->owner,
                    'status'      => 'cancelled',
        ]);

        Notifications::create([
                    'user_id'     => $user->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your order has been cancelled.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user->name,
                    'owner' => $user->id,
                ]);

        $trade->delete();

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
        $image = Material::where('id', $trade->material_id)->first();
        $user = User::where('id', $otherUserId)->first();
        $user2 = User::where('id', $authId)->first();



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

                Notifications::create([
                    'user_id'     => $user2->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your inquiries has been accepted.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user2->name,
                    'owner' => $user->id,
                ]);
        } else {
            // start new conversation
            $start = \Illuminate\Support\Str::uuid();
            \App\Models\Message::create([
                'start' => $start,
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Inquiry accepted successfully!',
            ]);

            \App\Models\Convo::create([
                'start' => $start,
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Open too see conversations.',
            ]);

             Notifications::create([
                    'user_id'     => $user2->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your inquiries has been accepted.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user2->name,
                    'owner' => $user->id,
                ]);
            Material::where('id', $trade->material_id)->update(['status' => 'off']);
            return back()->with('message', 'Inquiry accepted and message sent.');
        }
    }

    //Order

    public function rejectOrder($id)
    {
        $trade = Orders::findOrFail($id);
        // $trade->update(['status' => 'rejected']);
        Archive::create([
                    'user_id'     => $trade->user_id,
                    'users' => auth()->id(),
                    'material_id' => $trade->material_id,
                    'owner'    => $trade->owner,
                    'status'      => 'rejected',
        ]);
        $trade->delete();

        return redirect()->back()->with('message', 'Order rejected successfully!');
    }

    public function cancelOrder($id)
    {
        $trade = Orders::findOrFail($id);
        // $trade->update(['status' => 'cancelled']);

        $user = User::where('id', $trade->owner)->first();
        $image = Material::where('id', $trade->material_id)->first();
        Archive::create([
                    'user_id'     => $trade->user_id,
                    'users' => auth()->id(),
                    'material_id' => $trade->material_id,
                    'owner'    => $trade->owner,
                    'status'      => 'cancelled',
        ]);

        Notifications::create([
                    'user_id'     => $user->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your order has been cancelled.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user->name,
                    'owner' => $user->id,
                ]);

        $trade->delete();

        return redirect()->back()->with('message', 'Order cancelled successfully!');
    }

    public function acceptOrder($id)
    {
        $trade = Orders::findOrFail($id);
        // ✅ Accept this trade
        $trade->update(['status' => 'accepted']);

        // ✅ Reject all other trades with the same trade_for
        Orders::where('material_id', $trade->material_id)
            ->where('id', '!=', $trade->id)
            ->update(['status' => 'rejected']);

        $image = Material::where('id', $trade->material_id)->first();

        $authId = auth()->id();
        $otherUserId = $trade->user_id; // user you're trading with
        $materialId = $trade->material_id;

        $user = User::where('id', $otherUserId)->first();
        $user2 = User::where('id', $authId)->first();

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
                'content' => 'Order accepted successfully!',
            ]);

            Notifications::create([
                    'user_id'     => $user2->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your order has been accepted.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user2->name,
                    'owner' => $user->id,
                ]);
        } else {
            // start new conversation

            $start = \Illuminate\Support\Str::uuid();
            \App\Models\Message::create([
                'start' => $start,
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Order accepted successfully!',
            ]);

            \App\Models\Convo::create([
                'start' => $start,
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Open too see conversations.',
            ]);

            Notifications::create([
                    'user_id'     => $user2->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your order has been accepted.',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user2->name,
                    'owner' => $user->id,
                ]);
            Material::where('id', $trade->material_id)->update(['status' => 'off']);
            return back()->with('message', 'Order accepted and message sent.');
        }
    }


    public function completeOrder($id)
    {
        $trade = Orders::findOrFail($id);
        // ✅ Accept this trade
        $trade->update(['status' => 'accepted']);

        // ✅ Reject all other trades with the same trade_for
        Orders::where('material_id', $trade->material_id)
            ->where('id', '!=', $trade->id)
            ->update(['status' => 'rejected']);

        $image = Material::where('id', $trade->material_id)->first();

        $authId = auth()->id();
        $otherUserId = $trade->user_id; // user you're trading with
        $materialId = $trade->material_id;

        $user = User::where('id', $otherUserId)->first();
        $user2 = User::where('id', $authId)->first();

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
                'content' => 'Order completed successfully!',
            ]);

            Notifications::create([
                    'user_id'     => $user2->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your order has been completed. Thank you!!',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user2->name,
                    'owner' => $user->id,
                ]);

                 Archive::create([
                    'user_id'     => $trade->user_id,
                    'users' => auth()->id(),
                    'material_id' => $trade->material_id,
                    'owner'    => $trade->owner,
                    'status'      => 'completed',
        ]);
                return back()->with('message', 'Order completed.');
        } else {
            // start new conversation

            $start = \Illuminate\Support\Str::uuid();
            \App\Models\Message::create([
                'start' => $start,
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Order completed successfully!',
            ]);

            \App\Models\Convo::create([
                'start' => $start,
                'sender_id' => $authId,
                'recipient_id' => $otherUserId,
                'material_id' => $materialId,
                'content' => 'Open too see conversations.',
            ]);

            Notifications::create([
                    'user_id'     => $user2->id,
                    'material_id' => $trade->material_id,
                    'quantity'    => 1,
                    'message'    => $user->name . ' your order has been completed. Thank you!!',
                    'username' => $user->name,
                    'image' => $image->image,
                    'ownername' => $user2->name,
                    'owner' => $user->id,
                ]);
            // Material::where('id', $trade->material_id)->update(['status' => 'off']);
            return back()->with('message', 'Order completed.');
        }
    }
}
