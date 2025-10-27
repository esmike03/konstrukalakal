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
use Illuminate\Notifications\Notification;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logon = auth()->id();
        $materials = Material::where('status', 'on')->latest()->paginate(3)->toArray(); // Convert to array

        $notifcount = Notifications::where('user_id', $logon)
                    ->orWhere('owner', $logon)->count();
        $item = Notifications::where('owner', $logon)->latest()->take(2)->get();
        $not = Notifications::get();
        $donateCount = Donate::where('owner', auth()->id())->count();
        $tradeCount = Trade::where('owner', auth()->id())->count();
        $orderCount = Orders::where('owner', auth()->id())->count();
        $totaling = ($donateCount + $tradeCount + $orderCount);

                $cartItemCount = Cart::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
            $donateItemCount = Donate::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();

            $tradeItemCount = Trade::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
            $orderItemCount = Orders::with(['material', 'user'])
            ->where('user_id', auth()->id())
            ->whereHas('material', function ($query) {
                $query->where('status', 'on');
            })
            ->count();
        $total = $cartItemCount + $donateItemCount + $tradeItemCount + $orderItemCount;
        return Inertia::render('Home', [
            'materials' => $materials,
            'cartItemCount' => $cartItemCount, // Send the full paginated data
            'notifcount' => $notifcount,
            'item' => $item,
            'totaling' => $totaling,
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
