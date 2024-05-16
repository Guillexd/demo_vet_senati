<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends FormRequest
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
            'name' => ['nullable', 'string', 'max:100'],
            'identity_document_id' => ['nullable', 'numeric'],
            'document_number' => [
                'nullable',
                $this->input('identity_document_id') == 1 || $this->input('identity_document_id') == 2 ? 'integer' : 'string',
                $this->input('identity_document_id') == 1 ? 'digits:8' : ($this->input('identity_document_id') == 2 ? 'digits:11' : 'max:15'),
                Rule::unique('customers', 'document_number')->ignore($this->id),
            ],
            'first_phone' => ['nullable', 'integer', 'max:99999999999'],
            'second_phone' => ['nullable', 'integer', 'max:99999999999'],
            'direction' => ['nullable', 'string', 'max:100'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'nombre',
            'identity_document_id' => 'tipo de documento',
            'document_number' => 'documento de identidad',
            'first_phone' => 'primer teléfono',
            'second_phone' => 'segundo teléfono',
            'direction' => 'dirección',
        ];
    }
}
