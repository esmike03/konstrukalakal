<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Post;
use Inertia\Inertia;
use App\Models\Trade;
use App\Models\Donate;
use App\Models\Orders;
use App\Models\Material;
use Illuminate\Http\Request;
use App\Models\Notifications;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logon = auth()->id();
        $materials = Material::latest()->paginate(3)->toArray(); // Convert to array

        $notifcount = Notifications::where('user_id', $logon)->count();
        $item = Notifications::where('user_id', $logon)->latest()->get();

        $cartItemCount = Cart::where('user_id', auth()->id())->count();
        $donateItemCount = Donate::where('user_id', auth()->id())->count();
        $tradeItemCount = Trade::where('user_id', auth()->id())->count();
        $orderItemCount = Orders::where('user_id', auth()->id())->count();
        $total = $cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount;
        return Inertia::render('Home', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount, // Send the full paginated data
            'notifcount' => $notifcount,
            'item' => $item,
            'total' => $total,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return inertia('Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        sleep(2);
        $fields = $request->validate([
            'body' => ['required']
        ]);

        Post::create($fields);

        return redirect('/');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('Show', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia("Edit", ['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        sleep(1);
        $fields = $request->validate([
            'body' => ['required']
        ]);

        $post->update($fields);

        return redirect('/')->with(
            'success', 'The post was updated successfully!'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect('/')->with(
            'message', 'Post Deleted!'
        );
    }
}
