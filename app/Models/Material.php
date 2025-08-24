<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'material_name', 'location', 'category', 'condition', 'availability', 'price', 'quantity', 'description', 'image', 'forbdt', 'status'
    ];
}
