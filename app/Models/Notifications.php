<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    protected $fillable = [
        'user_id',
        'material_id',
        'owner',
        'status',
        'quantity',
        'message',
        'image',
        'ownername',
        'username'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }
}
