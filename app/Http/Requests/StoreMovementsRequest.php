<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovementsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cash_register_id' => ['required', 'integer'],
            'type_of_movement' => ['required', 'integer', 'in:1,2'],
            'customer_id' => ['required_with:products,services', 'nullable', 'integer'],
            'products' => ['array', 'required_without_all:services,expenses'],
            'products.*.quantity' => ['required', 'numeric'],
            'services' => ['array', 'required_without_all:products,expenses'],
            'services.*.quantity' => ['required', 'numeric'],
            'expenses' => ['array', 'required_without_all:products,services'],
            'expenses.*.subtotal' => ['required', 'numeric'],
        ];
    }
    public function attributes()
    {
        return [
            'cash_register_id' => 'identificador de la caja',
            'type_of_movement' => 'tipo de movimiento',
            'customer_id' => 'cliente',
            'products' => 'productos',
            'products.*.quantity' => 'cantidad',
            'services' => 'servicios',
            'services.*.quantity' => 'cantidad',
            'expenses' => 'egresos',
            'expenses.*.subtotal' => 'subtotal',
        ];
    }
}
