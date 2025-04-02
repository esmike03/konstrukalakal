<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function show($id)
    {
        $material = Material::findOrFail($id);
        return inertia('MaterialDetails', ['material' => $material]);
    }

    public function back(){

        return redirect("/materials");
    }
}
