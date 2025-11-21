<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reporteditem extends Model
{
     protected $fillable = [
        'user_req',
        'rep_user',
        'rep_item',
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


     public function reportedItem()
    {
        return $this->belongsTo(Material::class, 'rep_item');
    }
}
