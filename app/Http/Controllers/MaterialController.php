<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Cart;
use App\Models\User;
use App\Models\Convo;
use App\Models\Trade;
use App\Models\Donate;
use App\Models\Orders;
use App\Models\Message;
use App\Models\Material;
use App\Models\ConvoList;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Notifications;


class MaterialController extends Controller
{
    public function show($id)
    {

        $cartItemCount = Cart::where('user_id', auth()->id())->count();
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

        $material = Material::findOrFail($id);
        $user = User::findOrFail($material->user_id);
        return inertia('MaterialDetails', [
            'material' => $material,
            'cartItemCount' => $cartItemCount,
            'user' => $user,
            'total' => $total,
            'totaling' => $totaling
        ]);
    }


    /**
     * Persist the changes from the edit form.
     * Route::put('/materials/{material}', [MaterialController::class, 'update'])->name('materials.update');
     */
    public function updateMaterial(Request $request, Material $material)
    {
        $validated = $request->validate([
            'material_name' => 'required|string|max:255',
            'forbdt'        => 'required|in:Sale,Trade,Donation',
            'category'      => 'required|string|max:255',
            'condition'     => 'required|string|max:255',
            'price'         => 'required|numeric|min:0',
            'quantity'      => 'required|integer|min:0',
            'description'   => 'nullable|string',
        ]);

        // mass‐assign the validated fields
        $material->update($validated);

        // redirect back to the edit page (so your flash banner can show)
        return redirect()
            ->route('materials.edit', $material)
            ->with('message', 'Material updated successfully!');
    }

    public function editMaterial($id)
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($id);
        $user = User::findOrFail($material->user_id);
        return inertia('MaterialEdit', [
            'material' => $material,
            'cartItemCount' => $cartItemCount,
            'user' => $user,
        ]);
    }



    public function send(Request $request)
    {

        $request->validate([
            'message'      => 'required|string|max:1000',
            'recipient_id' => 'required|exists:users,id',
            'material_id'  => 'required|exists:materials,id',
            'start'        => 'nullable|string', // Accept start from frontend
        ]);

        $authId = auth()->id();
        $user_name = auth()->user()->name;
        $recipient_name = User::where('id', $request->recipient_id)->first();

        $image = User::where('name', $user_name)->first();

        // Use start from request if provided, otherwise check existing conversation
        if (!empty($request->start)) {
            $start = $request->start;
        } else {
            $existingMessage = Message::where('material_id', $request->material_id)
                ->where(function ($q) use ($authId, $request) {
                    $q->where(function ($q2) use ($authId, $request) {
                        $q2->where('sender_id', $authId)
                            ->where('recipient_id', $request->recipient_id);
                    })->orWhere(function ($q2) use ($authId, $request) {
                        $q2->where('sender_id', $request->recipient_id)
                            ->where('recipient_id', $authId);
                    });
                })
                ->first();

            $start = !empty($existingMessage->start)
                ? $existingMessage->start
                : Str::uuid()->toString();
            if (empty($existingMessage)) {
                Convo::create([
                    'sender_id'    => $authId,
                    'recipient_id' => $request->recipient_id,
                    'material_id'  => $request->material_id,
                    'start'        => $start,
                    'content'      => 'Open to see conversations.',
                ]);

                $message = Message::create([
                    'sender_id'    => $request->recipient_id,
                    'recipient_id' => $request->recipient_id,
                    'material_id'  => $request->material_id,
                    'start'        => $start,
                    'content'      => 'Hi, ' . $user_name . '. Your message has been received. ' . $recipient_name->name . ' will reply as soon as they read your message!',
                    'created_at'   => Carbon::now()->addMinute(),
                    'updated_at'   => Carbon::now()->addMinute(),
                ]);

                Notifications::create([
                    'user_id'     => $authId,
                    'material_id' => $request->material_id,
                    'quantity'    => 1,
                    'message'    => $user_name . ' message you. Please check your inbox.',
                    'username' => $user_name,
                    'image' => $image->profile_image,
                    'ownername' => $user_name,
                    'owner' => $recipient_name->id,
                ]);
            }
        }


        // Save the new message
        $message = Message::create([
            'sender_id'    => $authId,
            'recipient_id' => $request->recipient_id,
            'material_id'  => $request->material_id,
            'start'        => $start,
            'content'      => $request->message,
        ]);

        return response()->json([
            'message' => $message,
            'conversationId' => $start,
        ]);
    }






    //to send message
    public function sendMessage($id)
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($id);
        $user = User::findOrFail($material->user_id);
        $authId = auth()->id();
        $ownerId = $material->user_id;

        // Find the conversation identifier (start)
        $conversation = Message::where('material_id', $material->id)
            ->where(function ($query) use ($authId, $ownerId) {
                $query->where(function ($q) use ($authId, $ownerId) {
                    $q->where('sender_id', $authId)
                        ->where('recipient_id', $ownerId);
                })
                    ->orWhere(function ($q) use ($authId, $ownerId) {
                        $q->where('sender_id', $ownerId)
                            ->where('recipient_id', $authId);
                    });
            })
            ->first();

        $start = $conversation ? $conversation->start : null;

        // Now fetch all messages using start if it exists
        $messages = $start
            ? Message::where('start', $start)->orderBy('created_at', 'asc')->get()
            : collect(); // empty if no conversation yet

        return inertia('SendMessage', [
            'material'       => $material,
            'cartItemCount'  => $cartItemCount,
            'user'           => $user,
            'messages'       => $messages,
            'conversationId' => $start, // pass conversation id if you need it
        ]);
    }

    //to send message
    public function sendMessagex($id)
    {
        $tradeUser = Trade::where('item_title', $id)
            ->first();

        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($tradeUser->trade_for);

        $user = User::findOrFail($tradeUser->user_id);
        $authId = $tradeUser->user_id;

        $ownerId = $material->user_id;

        // Find the conversation identifier (start)
        $conversation = Message::where('material_id', $material->id)
            ->where(function ($query) use ($authId, $ownerId) {
                $query->where(function ($q) use ($authId, $ownerId) {
                    $q->where('sender_id', $authId)
                        ->where('recipient_id', $ownerId);
                })
                    ->orWhere(function ($q) use ($authId, $ownerId) {
                        $q->where('sender_id', $ownerId)
                            ->where('recipient_id', $authId);
                    });
            })
            ->first();

        $start = $conversation ? $conversation->start : null;

        // Now fetch all messages using start if it exists
        $messages = $start
            ? Message::where('start', $start)->orderBy('created_at', 'asc')->get()
            : collect(); // empty if no conversation yet

        return inertia('SendMessage', [
            'material'       => $material,
            'cartItemCount'  => $cartItemCount,
            'user'           => $user,
            'messages'       => $messages,
            'conversationId' => $start, // pass conversation id if you need it
        ]);
    }

    //to send message
    public function sendMessagexx($id, $userId)
    {
        $DonateUser = Donate::where('material_id', $id)
            ->where('user_id', $userId)
            ->first();

        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($DonateUser->material_id);
        $user = User::findOrFail($DonateUser->user_id);

        $authId = $DonateUser->user_id;

        $ownerId = $material->user_id;

        // Find the conversation identifier (start)
        $conversation = Message::where('material_id', $material->id)
            ->where(function ($query) use ($authId, $ownerId) {
                $query->where(function ($q) use ($authId, $ownerId) {
                    $q->where('sender_id', $authId)
                        ->where('recipient_id', $ownerId);
                })
                    ->orWhere(function ($q) use ($authId, $ownerId) {
                        $q->where('sender_id', $ownerId)
                            ->where('recipient_id', $authId);
                    });
            })
            ->first();

        $start = $conversation ? $conversation->start : null;

        // Now fetch all messages using start if it exists
        $messages = $start
            ? Message::where('start', $start)->orderBy('created_at', 'asc')->get()
            : collect(); // empty if no conversation yet

        return inertia('SendMessage', [
            'material'       => $material,
            'cartItemCount'  => $cartItemCount,
            'user'           => $user,
            'messages'       => $messages,
            'conversationId' => $start, // pass conversation id if you need it
        ]);
    }

    public function sendMessagexxx($id, $userId)
    {
        $DonateUser = Orders::where('material_id', $id)
            ->where('user_id', $userId)
            ->first();

        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($DonateUser->material_id);
        $user = User::findOrFail($DonateUser->user_id);
        $authId = $DonateUser->user_id;

        $ownerId = $material->user_id;

        // Find the conversation identifier (start)
        $conversation = Message::where('material_id', $material->id)
            ->where(function ($query) use ($authId, $ownerId) {
                $query->where(function ($q) use ($authId, $ownerId) {
                    $q->where('sender_id', $authId)
                        ->where('recipient_id', $ownerId);
                })
                    ->orWhere(function ($q) use ($authId, $ownerId) {
                        $q->where('sender_id', $ownerId)
                            ->where('recipient_id', $authId);
                    });
            })
            ->first();

        $start = $conversation ? $conversation->start : null;

        // Now fetch all messages using start if it exists
        $messages = $start
            ? Message::where('start', $start)->orderBy('created_at', 'asc')->get()
            : collect(); // empty if no conversation yet

        return inertia('SendMessage', [
            'material'       => $material,
            'cartItemCount'  => $cartItemCount,
            'user'           => $user,
            'messages'       => $messages,
            'conversationId' => $start, // pass conversation id if you need it
        ]);
    }

    public function fetchMessages($start)
    {
        $authId = auth()->id();

        $messages = Message::where('start', $start)

            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'sender_id' => $msg->sender_id,
                    'sender_name' => optional(User::find($msg->sender_id))->name ?? 'Unknown',
                    'sender_avatar' => optional(User::find($msg->sender_id))->profile_image,
                    'content' => $msg->content,
                    'created_at' => $msg->created_at,
                ];
            });

        return response()->json($messages);
    }


    public function sendMessage2($start)
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $messageId = Message::where('start', $start)->first();

        $material = Material::findOrFail($messageId->material_id);
        $user = User::findOrFail($material->user_id);
        $uq = $messageId->start;
        // dd($uq);
        $authId = auth()->id();
        $ownerId = $material->user_id;


        // Find the conversation identifier (start)
        $conversation = Message::where('start', $uq)
            ->where(function ($query) use ($authId, $ownerId, $uq) {
                $query->where(function ($q) use ($authId, $ownerId, $uq) {
                    $q->where('sender_id', $authId)
                        ->orWhere('recipient_id', $ownerId);
                })
                    ->orWhere(function ($q) use ($authId, $ownerId) {
                        $q->where('sender_id', $ownerId)
                            ->where('recipient_id', $authId);
                    });
            })
            ->orderBy('created_at', 'asc')
            ->get();
        // dd($conversation);
        // $start = $conversation ? $conversation->start : null;
        // $messages = $conversation;
        // Now fetch all messages using start if it exists
        // $messages = $start
        //     ? Message::where('start', $start)->orderBy('created_at', 'asc')->get()
        //     : collect(); // empty if no conversation yet
        $messages = $conversation->map(function ($msg) {
            $msg->sender_name = optional(User::find($msg->sender_id))->name ?? 'Unknown';
            $msg->sender_avatar = optional(User::find($msg->sender_id))->profile_image ?? null;
            return $msg;
        });

        return inertia('SendMessage', [
            'material'       => $material,
            'cartItemCount'  => $cartItemCount,
            'user'           => $user,
            'messages'       => $messages,
            'conversationId' => $start, // pass conversation id if you need it
        ]);
    }




    public function back()
    {

        return redirect("/materials");
    }

    public function uploadDestroy($id)
    {
        // Validate the incoming data
        $upload = Material::findOrFail($id);


        if ($upload) {
            $upload->status = 'off';
            $upload->save();
        }

        // Optionally, you can return a response with the updated cart data
        return back()->with('message', 'Material Deleted.');
    }

    public function uploadRestore($id)
    {
        // Validate the incoming data
        $upload = Material::findOrFail($id);


        if ($upload) {
            $upload->status = 'on';
            $upload->save();
        }

        // Optionally, you can return a response with the updated cart data
        return back()->with('message', 'Material Restored.');
    }

    public function createTrade(Request $request)
    {
        if (!auth()->check()) {
            // Redirect to the login route (trigger login modal)
            return back()->with(
                'message',
                'Please login to trade.'
            );
        }

        $user = auth()->id();
        $exist = Trade::where('user_id', $user)
            ->where('trade_for', $request->material['id'])
            ->get();

        if ($exist->isNotEmpty()) {
            return back()->with('message', 'You have a pending trade with this item!');
        }

        return inertia('CreateTrade', [
            'material' => $request->material,
            'quantity' => $request->quantity
        ]);
    }

    public function storeTrade(Request $request)
    {
        // dd($request->trade_for);

        $request->validate([
            'item_title' => 'required|string|max:255',
            'item_image' => 'required|image',
            'trade_for' => 'required|integer',
            'quantity' => 'required',
            'trade_quantity' => 'required',
            'description' => 'required'
        ]);

        $material_user = Material::where('id', $request->trade_for)->firstorFail();
        // dd($material_user);


        $imagePath = $request->file('item_image')->store('trades', 'public');

        Trade::create([
            'user_id' => auth()->id(),
            'item_title' => $request->item_title,
            'item_image' => $imagePath,
            'trade_for' => $request->trade_for,
            'quantity' => $request->quantity,
            'owner' => $material_user->user_id,
            'status' => 'pending',
            'description' => $request->description,
            'trade_quantity' => $request->trade_quantity

        ]);

        return redirect()
            ->route('material.tradex')
            ->with('message', 'Trade Pending!');
    }

    public function myTrades()
    {
        $user = auth()->user();
        $userId = auth()->id();
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
        // $trades = Trade::with('material', 'user')
        //     ->where(function ($q) use ($user) {
        //         $q->where('user_id', $user->id);
        //     })
        //     ->get();

        $trades = Trade::with(['material', 'user', 'owner'])
            ->where('user_id', $user->id)
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->get();

        // dd($trades->first()->user_id);
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
        if ($trades->isNotEmpty() && $trades->first()->user_id == $userId) {
            return inertia('MyTrades', [
                'trades' => $trades,
                'isUser' => True,
                'total' => $total,
                'item' => $item,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
                'totaling' => $totaling
            ]);
        } else {

            return inertia('MyTrades', [
                'trades' => $trades,
                'isUser' => False,
                'total' => $total,
                'item' => $item,
                'cartItemCount' => $cartItemCount,
                'donateItemCount' => $donateItemCount,
                'tradeItemCount' => $tradeItemCount,
                'orderItemCount' => $orderItemCount,
                'totaling' => $totaling
            ]);
        }
    }

    public function TradeList()
    {
        $user = auth()->user();
        $userId = auth()->id();
        $logon = auth()->id();
        $item = Notifications::where('owner', $logon)->latest()->take(5)->get();
        $trades = Trade::with('material', 'user')
            ->where(function ($q) use ($user) {
                $q->where('owner', $user->id);
            })
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->get();

        // dd($trades->first()->user_id);
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
        if ($trades->isNotEmpty() && $trades->first()->user_id == $userId) {
            return inertia('TradeList', [
                'trades' => $trades,
                'isUser' => True,
                'total' => $total,
                'item' => $item,
                'donate' => $donateCount,
                'trader' => $tradeCount,
                'order' => $orderCount,
                'totaling' => $totaling
            ]);
        } else {

            return inertia('TradeList', [
                'trades' => $trades,
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

    public function sendDirect($id, $user)
    {

        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($id);
        $user = User::findOrFail($user);

        $authId = auth()->id();
        $ownerId = $user;

        // Find the conversation identifier (start)
        $conversation = Message::where('material_id', $material->id)
            ->where(function ($query) use ($authId, $ownerId) {
                $query->where(function ($q) use ($authId, $ownerId) {
                    $q->where('sender_id', $authId)
                        ->where('recipient_id', $ownerId);
                })
                    ->orWhere(function ($q) use ($authId, $ownerId) {
                        $q->where('sender_id', $ownerId)
                            ->where('recipient_id', $authId);
                    });
            })
            ->first();

        $start = $conversation ? $conversation->start : null;

        // Now fetch all messages using start if it exists
        $messages = $start
            ? Message::where('start', $start)->orderBy('created_at', 'asc')->get()
            : collect(); // empty if no conversation yet

        return inertia('SendMessage', [
            'material'       => $material,
            'cartItemCount'  => $cartItemCount,
            'user'           => $user,
            'messages'       => $messages,
            'conversationId' => $start, // pass conversation id if you need it
        ]);
    }

    public function convoDestroy($id)
    {
        // Validate the incoming data

        $convo = Convo::where('start', $id)->first();

        $authId = auth()->id();

        if($authId == $convo->sender_id){
            $convo->user1 = 'off';
            $convo->save();
        } else if($authId == $convo->recipient_id){
            $convo->user2 = 'off';
            $convo->save();
        }

        // Optionally, you can return a response with the updated cart data
        return back()->with('message', 'Conversation Deleted.');
    }
    public function userDisable($id)
    {
        // Validate the incoming data

        $user = User::where('id', $id)->first();

        $authId = auth()->id();

        Material::where('user_id', $id)->update(['status' => 'off']);

        $user->status = 'disabled';
        $user->save();


        // Optionally, you can return a response with the updated cart data
        return back()->with('message', 'User Disabled.');
    }

    public function userEnable($id)
    {
        // Validate the incoming data

        $user = User::where('id', $id)->first();

        $authId = auth()->id();

        Material::where('user_id', $id)->update(['status' => 'on']);
            $user->status = 'enabled';
            $user->save();


        // Optionally, you can return a response with the updated cart data
        return back()->with('message', 'User Enabled.');
    }
}
