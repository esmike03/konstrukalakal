<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function show($id)
    {
        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $material = Material::findOrFail($id);
        return inertia('MaterialDetails', [
            'material' => $material,
            'cartItemCount' => $cartItemCount,
        ]);
    }

    public function back(){

        return redirect("/materials");
    }
}
