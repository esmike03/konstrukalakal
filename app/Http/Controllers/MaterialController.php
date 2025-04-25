<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Material;
use App\Models\User;
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

    public function back(){

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
}
