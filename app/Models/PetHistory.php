<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PetHistory extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public function pet(): BelongsTo
    {
        return $this->belongsTo(Pet::class);
    }
}
