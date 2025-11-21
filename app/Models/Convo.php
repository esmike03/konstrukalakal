<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Convo extends Model
{
    protected $fillable = [
        'sender_id',
        'recipient_id',
        'material_id',
        'start',
        'content',
        'user1',
        'user2'
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }
}
