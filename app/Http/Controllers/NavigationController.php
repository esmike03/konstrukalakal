<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NavigationController extends Controller
{
    public function toMaterials()
    {
        sleep(1);
        $materials = Material::all();
        return inertia('Materials', [
            'materials' => $materials,
        ]);
    }

    public function tradeMaterials()
    {
        sleep(1);
        $materials = Material::where('forbdt', 'Trade')->get();
        return inertia('TradeMaterials', [
            'materials' => $materials,
        ]);
    }

    public function buyMaterials()
    {
        sleep(1);
        $materials = Material::where('forbdt', 'Sale')->get();
        return inertia('BuyMaterials', [
            'materials' => $materials,
        ]);
    }

    public function donateMaterials()
    {
        sleep(1);
        $materials = Material::where('forbdt', 'Donate')->get();
        return inertia('DonateMaterials', [
            'materials' => $materials,
        ]);
    }

    public function about()
    {
        return inertia('About');
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
}
