<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Reported;
use App\Models\Reporteditem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('UsersList', [
            'users' => $users
        ]);
    }

        public function reported()
    {
         $reports = Reported::with(['reportedBy', 'reportedUser'])
            ->latest()
            ->get();

        return Inertia::render('Reported', [
            'reports' => $reports,
        ]);
    }

public function reportedItem()
{
    $reports = Reporteditem::with(['reportedBy', 'reportedUser', 'reportedItem'])
        ->whereHas('reportedItem', function ($q) {
            $q->where('status', 'on'); // or whatever your active value is
        })
        ->latest()
        ->get();

    return Inertia::render('ReportedItem', [
        'reports' => $reports,
    ]);
}



    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

        public function destroyuserx($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}
