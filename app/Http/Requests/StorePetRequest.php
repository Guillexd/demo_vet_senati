<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePetRequest extends FormRequest
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
            'age' => ['required', 'string', 'min:0', 'max:20'],
            'customer_id' => ['required', 'numeric'],
            'breed_id' => ['required', 'numeric'],
            'pet_image' => ['nullable', 'image', 'max:1024'],
            'observations' => ['nullable', 'string'],
            'ce' => ['required', 'string'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'nombre',
            'customer_id' => 'dueño de la mascota',
            'breed_id' => 'raza de la mascota',
            'age' => 'edad',
            'pet_image' => 'foto de la mascota',
            'observations' => 'observaciones',
            'ce' => 'C/E',
        ];
    }
}
