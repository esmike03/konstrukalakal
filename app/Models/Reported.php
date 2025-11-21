<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reported extends Model
{
        protected $fillable = [
        'user_req',
        'rep_user',
        'reason',

    ];

        public function reportedBy()
    {
        return $this->belongsTo(User::class, 'user_req');
    }

    public function reportedUser()
    {
        return $this->belongsTo(User::class, 'rep_user');
    }
}
