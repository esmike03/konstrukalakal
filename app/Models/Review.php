<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'user_id',
        'review',
        'rating',
        'review_user',
        'comment',

    ];

     public function owner()
    {
        return $this->belongsTo(User::class, 'review_user');
    }

    public function reviewUser()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
