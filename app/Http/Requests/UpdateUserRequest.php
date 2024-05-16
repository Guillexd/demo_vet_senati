<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'email', 'max:100', Rule::unique('users', 'email')->ignore($this->id)],
            'rol_id' => ['required', 'integer'],
            'dni' => ['required', 'integer', 'digits:8', Rule::unique('users', 'dni')->ignore($this->id)],
            'phone' => ['required', 'integer', 'max:99999999999'],
            'direction' => ['required', 'string', 'max:100'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'nombre',
            'email' => 'correo electrónico',
            'rol_id' => 'rol',
            'phone' => 'teléfono',
            'direction' => 'dirección',
        ];
    }
}
