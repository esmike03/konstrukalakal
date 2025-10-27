<?php

namespace App\Models;

use App\Models\User;
use App\Models\Material;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    // Allow mass assignment for these fields.
    protected $fillable = [
        'user_id',
        'material_id',
        'quantity',
        'owner',
        'status'
    ];

    /**
     * Get the user that owns this cart item.
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner');
    }
     public function user()
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Get the material associated with this cart item.
     */
    public function material()
    {
        return $this->belongsTo(Material::class);
    }


}
