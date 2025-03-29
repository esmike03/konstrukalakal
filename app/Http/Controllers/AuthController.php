<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        sleep(2);
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect('/')->with(
                'success', 'The post was updated successfully!'
            );
        }

        return back()->withErrors(['email' => 'Invalid login credentials.']);
    }

    public function register(Request $request)
    {
        // Validate the registration data
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'phone' => ['required', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:10'],
            'address'     => 'required|string|max:255',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // Create the user
        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'contact'    => $validated['phone'],
            'address'     => $validated['address'],
            'password' => Hash::make($validated['password']),
        ]);

        // Log the user in
        Auth::login($user);

        // Redirect to the intended page or homepage
        return redirect()->intended('/');
    }
}
