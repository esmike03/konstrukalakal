<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donate extends Model
{
    protected $fillable = [
        'user_id',
        'material_id',
        'owner',
        'status',
        'quantity'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner');
    }
     public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }
}
