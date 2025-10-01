<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Archive extends Model
{
    protected $fillable = [
        'user_id',
        'users',
        'material_id',
        'owner',
        'status',
        'quantity',
        'item_title',
        'item_image'
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
