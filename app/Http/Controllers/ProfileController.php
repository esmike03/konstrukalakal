<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function updateProfileImage(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|max:15360', // 15 MB limit
        ]);

        $user = auth()->user();

        // Delete old profile image if exists
        if ($user->profile_image) {
            Storage::delete('public/' . $user->profile_image);
        }

        // Store new image
        $path = $request->file('profile_image')->store('profile_images', 'public');

        // Update user profile image path
        $user->update(['profile_image' => $path]);

        return redirect()->back()->with('message', 'Profile picture updated successfully!');
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'email'         => 'required|email|max:255|unique:users,email,'.$user->id,
            'address'       => 'nullable|string|max:255',
            'contact'       => 'nullable|string|max:50',
        ]);


        // Save all fields
        $user->update($validated);

        return back()->with('message', 'Profile updated successfully!');
    }
}
