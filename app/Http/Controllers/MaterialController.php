<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\Trade;
use App\Models\Message;
use App\Models\Material;
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
            'message' => 'required|string|max:1000',
            'recipient_id' => 'required|exists:users,id',
            'material_id' => 'required|exists:materials,id',
        ]);

        Message::create([
            'sender_id' => auth()->id(),
            'recipient_id' => $request->recipient_id,
            'material_id' => $request->material_id,
            'content' => $request->message,
        ]);

        return back()->with('success', 'Message sent!');
    }


    //to send message
    public function sendMessage($id)
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($id);
        $user = User::findOrFail($material->user_id);

        $authId  = auth()->id();
        $otherId = $material->user_id;

        $messages = Message::where('material_id', $material->id)
            ->where(function ($q) use ($authId, $otherId) {
                // messages I sent to them
                $q->where('sender_id',    $authId)
                    ->where('recipient_id', $otherId);
            })
            ->orWhere(function ($q) use ($authId, $otherId) {
                // messages they sent to me
                $q->where('sender_id',    $otherId)
                    ->where('recipient_id', $authId);
            })
            ->orderBy('created_at')
            ->get();

        return inertia('SendMessage', [
            'material' => $material,
            'cartItemCount' => $cartItemCount,
            'user' => $user,
            'messages' => $messages,
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
