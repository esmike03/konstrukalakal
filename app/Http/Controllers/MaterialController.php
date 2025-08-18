<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\Trade;
use App\Models\Message;
use App\Models\Material;
use Illuminate\Support\Str;
use Illuminate\Http\Request;


class MaterialController extends Controller
{
    public function show($id)
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($id);
        $user = User::findOrFail($material->user_id);
        return inertia('MaterialDetails', [
            'material' => $material,
            'cartItemCount' => $cartItemCount,
            'user' => $user,
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
        ]);

        $authId = auth()->id();

        // Check if there's already a conversation between these two users for this material
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

        // Generate new UUID only if no existing conversation
        $start = $existingMessage && $existingMessage->start
            ? $existingMessage->start
            : Str::uuid()->toString();

        Message::create([
            'sender_id'    => $authId,
            'recipient_id' => $request->recipient_id,
            'material_id'  => $request->material_id,
            'start'        => $start,
            'content'      => $request->message,
        ]);

        return back()->with('success', 'Message sent!');
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

    public function sendMessage2($start)
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $messageId = Message::where('start', $start)->firstOrFail();

        $material = Material::findOrFail($messageId->material_id);
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




    public function back()
    {

        return redirect("/materials");
    }

    public function uploadDestroy($id)
    {
        // Validate the incoming data
        $upload = Material::findOrFail($id);
        $upload->delete();

        if ($upload) {
            $upload->delete();
        }

        // Optionally, you can return a response with the updated cart data
        return back()->with('message', 'Material Deleted.');
    }

    public function createTrade(Request $request)
    {
        return inertia('CreateTrade', [
            'material' => $request->material,
        ]);
    }

    public function storeTrade(Request $request)
    {
        $request->validate([
            'item_title' => 'required|string|max:255',
            'item_image' => 'required|image',
            'trade_for' => 'required|integer',
        ]);

        $imagePath = $request->file('item_image')->store('trades', 'public');

        Trade::create([
            'user_id' => auth()->id(),
            'item_title' => $request->item_title,
            'item_image' => $imagePath,
            'trade_for' => $request->trade_for,
            'status' => 'pending',
        ]);

        return back()->with('message', 'Trade Pending.');
    }

    public function myTrades()
    {
        $user = auth()->user();
        $trades = Trade::with('material')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return inertia('MyTrades', [
            'trades' => $trades,
        ]);
    }
}
