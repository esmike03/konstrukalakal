<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Trade;
use App\Models\Donate;
use App\Models\Orders;
use App\Models\Review;
use App\Models\Material;
use App\Models\Reported;
use App\Models\Reporteditem;
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
        return Inertia::render('Home', [ //Home
            'materials' => $materials,
            'cartItemCount' => $cartItemCount, // Send the full paginated data
            'notifcount' => $notifcount,
            'item' => $item,
            'totaling' => $totaling,
            'total' => $total,
        ]);
    }

    public function indexAdmin()
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
        return Inertia::render('Statistics', [ //Home
            'materials' => $materials,
            'cartItemCount' => $cartItemCount, // Send the full paginated data
            'notifcount' => $notifcount,
            'item' => $item,
            'totaling' => $totaling,
            'total' => $total,
            'users' => User::all(),
    'materials' => Material::all(),
    'reportedUsers' => Reported::all(),
    'reportedItems' => Reporteditem::all(),
        ]);
    }

    public function storeReview(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);


        Review::create([
            'review_user' => auth()->id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
            'user_id' => $id,
        ])->with(
            'message', 'Review Added Successfully!'
        );
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

    public function Reported(Request $request){
        $request->validate([
        'user_id' => 'required|exists:users,id',
        'reason' => 'required|string|max:255',
        ]);

        \App\Models\Reported::create([
            'rep_user' => $request->user_id,
            'reason' => $request->reason,
            'user_req' => auth()->id(),
        ]);

        // \App\Models\Notifications::create([
        //             'user_id'     => $request->user_id,
        //             'users' => auth()->id(),
        //             'material_id' => '18',
        //             'owner'    => $request->user_id,
        //             'status'      => 'reported',
        //             'item_title' => $request->reason,
        //             'item_image' => '',
        // ]);

        Notifications::create([
                    'user_id'     => $request->user_id,
                    'material_id' => 18,
                    'quantity'    => 1,
                    'message'    => 'Someone have reported you for ' . $request->reason . '.',
                    'username' => 'Confidential',
                    'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFjZWhrimd975f_0Y66f0qySHGOodLt_3BxQ&s',
                    'ownername' => $request->user_id,
                    'owner' => $request->user_id,
                ]);

        return back()->with('message', 'Report submitted successfully.');
    }

     public function ReportedItem(Request $request){
        $request->validate([
        'user_id' => 'required|exists:users,id',
        'reason' => 'required|string|max:255',
        'itemer' => 'required|exists:materials,id',
        ]);


        \App\Models\Reporteditem::create([
            'rep_user' => $request->user_id,
            'reason' => $request->reason,
            'rep_item' => $request->itemer,
            'user_req' => auth()->id(),
        ]);

        return back()->with('message', 'Report submitted successfully.');
    }

   public function BlockUser(Request $request)
{
    $blockedUser = User::findOrFail($request->user_id); // person being blocked
    $currentUser = auth()->user(); // signed-in user

    // --- 1. Update blockedUser.blocked (add current user ID) ---
    $blockedBy = $blockedUser->blocked ?? [];
    if (!is_array($blockedBy)) {
        $blockedBy = json_decode($blockedBy, true) ?? [];
    }

    if (!in_array($currentUser->id, $blockedBy)) {
        $blockedBy[] = $currentUser->id;
    }
    $blockedUser->blocked = $blockedBy;
    $blockedUser->save();

    // --- 2. Update currentUser.blocked (add blocked user's ID) ---
    $myBlockedList = $currentUser->blocked ?? [];
    if (!is_array($myBlockedList)) {
        $myBlockedList = json_decode($myBlockedList, true) ?? [];
    }

    if (!in_array($blockedUser->id, $myBlockedList)) {
        $myBlockedList[] = $blockedUser->id;
    }
    $currentUser->blocked = $myBlockedList;
    $currentUser->save();

    return back()->with([
        'message' => 'User has been blocked successfully.',
        'blocked_by' => $blockedBy
    ]);
}


public function UnblockUser(Request $request)
{
    $blockedUser = User::findOrFail($request->user_id); // person being unblocked
    $currentUser = auth()->user(); // signed-in user

    // --- 1. Remove current user from blockedUser.blocked ---
    $blockedBy = $blockedUser->blocked ?? [];
    if (!is_array($blockedBy)) {
        $blockedBy = json_decode($blockedBy, true) ?? [];
    }

    $blockedBy = array_values(array_diff($blockedBy, [$currentUser->id]));
    $blockedUser->blocked = $blockedBy;
    $blockedUser->save();

    // --- 2. Remove blockedUser ID from currentUser.blocked ---
    $myBlockedList = $currentUser->blocked ?? [];
    if (!is_array($myBlockedList)) {
        $myBlockedList = json_decode($myBlockedList, true) ?? [];
    }

    $myBlockedList = array_values(array_diff($myBlockedList, [$blockedUser->id]));
    $currentUser->blocked = $myBlockedList;
    $currentUser->save();

    return back()->with([
        'message' => 'User has been unblocked successfully.',
        'blocked_by' => $blockedBy
    ]);
}



}
