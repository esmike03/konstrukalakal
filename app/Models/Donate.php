<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donate extends Model
{
    protected $fillable = [
        'user_id',
        'material_id',
        'quantity',
    ];

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
