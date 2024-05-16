<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class CashRegister extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public function services(): MorphToMany
    {
        return $this->morphedByMany(Service::class, 'cash_registerable')->orderBy('cash_registerables.id', 'desc')->withPivot('id', 'voucher_id', 'customer_id', 'user_id', 'transactions_type', 'description', 'subtotal', 'quantity', 'created_at');
    }
    public function products(): MorphToMany
    {
        return $this->morphedByMany(Product::class, 'cash_registerable')->orderBy('cash_registerables.id', 'desc')->withPivot('id', 'voucher_id', 'customer_id', 'user_id', 'transactions_type', 'description', 'subtotal', 'quantity', 'created_at');
    }
    public function expenses(): MorphToMany
    {
        return $this->morphedByMany(Expense::class, 'cash_registerable')->orderBy('cash_registerables.id', 'desc')->withPivot('id', 'voucher_id', 'customer_id', 'transactions_type', 'description', 'subtotal', 'quantity', 'created_at');
    }
}
