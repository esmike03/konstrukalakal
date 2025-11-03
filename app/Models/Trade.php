<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Trade extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'trade_for',
        'item_title',
        'item_image',
        'owner',
        'status',
        'quantity',
        'description',
        'trade_quantity'
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
        return $this->belongsTo(Material::class, 'trade_for');
    }
}
