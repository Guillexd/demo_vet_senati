<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:0', 'max:999999'],
            'purchase_price' => ['required', 'min:0', 'numeric', 'max:999999'],
            'stock' => ['required', 'integer', 'min:0', 'max:999999'],
            'utility' => ['required', 'numeric', 'min:0', 'max:999999'],
            'serie' => ['nullable', 'string', 'max:20', Rule::unique('products', 'serie')->ignore($this->id)],
            'product_image' => ['nullable', 'image', 'max:1024'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
        ];
    }
    public function attributes()
    {
        return [
            'name' => 'nombre',
            'price' => 'precio',
            'purchase_price' => 'precio de compra',
            'utility' => 'utilidad',
            'product_image' => 'imagen del producto',
            'description' => 'descripción',
            'due_date' => 'fecha de vencimiento'
        ];
    }
}
