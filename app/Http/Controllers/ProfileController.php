<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\User;

class ProfileController extends Controller
{
    public function updateProfileImage(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
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
}
