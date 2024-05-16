<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public function identity_document() : BelongsTo {
        return $this->belongsTo(IdentityDocument::class);
    }
    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn (string|null $value) => $value ?? "cliente-" . Customer::latest()->first()?->id + 1 ?? "cliente x",
        );
    }
}
