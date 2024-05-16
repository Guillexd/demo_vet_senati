<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePetHistoryRequest extends FormRequest
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
            'pet_id' => ['required', 'numeric'],
            'last_deworming' => ['nullable', 'date'],
            'reason' => ['required', 'string', 'max:255'],
            'awareness' => ['nullable', 'string', 'max:20'],
            'weight' => ['nullable', 'string', 'max:20'],
            'mucosa' => ['nullable', 'string', 'max:20'],
            'tllc' => ['nullable', 'string', 'max:20'],
            'fc' => ['nullable', 'string', 'max:20'],
            'fr' => ['nullable', 'string', 'max:20'],
            'spo2' => ['nullable', 'string', 'max:20'],
            'temperature' => ['nullable', 'string', 'max:20'],
            'card_con' => ['nullable', 'string', 'max:20'],
            'temper' => ['nullable', 'string', 'max:20'],
            'state' => ['nullable', 'string', 'max:20'],
            'linfonodulos' => ['nullable', 'string', 'max:255'],
            'aus_card' => ['nullable', 'string', 'max:255'],
            'aus_resp' => ['nullable', 'string', 'max:255'],
            'tegumento' => ['nullable', 'string', 'max:255'],
            'palpacion_abd' => ['nullable', 'string', 'max:255'],
            'diagnostico' => ['nullable', 'string'],
            'hto' => ['nullable', 'string', 'max:10'],
            'glucosa' => ['nullable', 'string', 'max:10'],
            'pt' => ['nullable', 'string', 'max:10'],
            'du_refrac' => ['nullable', 'string', 'max:10'],
            'frotis' => ['nullable', 'string', 'max:255'],
            'hemograma' => ['required', 'boolean'],
            'hemograma_image_url' => ['nullable', 'max:1024'],
            'hemograma_public_id' => ['nullable'],
            'ecografia' => ['required', 'boolean'],
            'ecografia_image_url' => ['nullable', 'max:1024'],
            'ecografia_public_id' => ['nullable'],
            'abdominal' => ['required', 'boolean'],
            'gestacional' => ['required', 'boolean'],
            'ecofast' => ['required', 'boolean'],
            'tfast' => ['required', 'boolean'],
            'vetbles' => ['required', 'boolean'],
            'bioquimica' => ['required', 'boolean'],
            'radiografias' => ['required', 'boolean'],
            'radiografias_image_url' => ['nullable', 'max:1024'],
            'radiografias_public_id' => ['nullable'],
            'vistas' => ['nullable', 'string', 'max:100'],
            'zona' => ['nullable', 'string', 'max:255'],
            'electrolitos' => ['nullable', 'string'],
            'bilir' => ['nullable', 'string', 'max:30'],
            'ceto' => ['nullable', 'string', 'max:30'],
            'sang' => ['nullable', 'string', 'max:30'],
            'prot' => ['nullable', 'string', 'max:30'],
            'nitri' => ['nullable', 'string', 'max:30'],
            'leu' => ['nullable', 'string', 'max:30'],
            'glu' => ['nullable', 'string', 'max:30'],
            'ph' => ['nullable', 'string', 'max:30'],
            'plan' => ['nullable', 'string'],
            'next_date' => ['nullable', 'date'],
        ];
    }
    public function attributes()
    {
        return [
            'pet_id' => 'mascota',
            'last_deworming' => 'última desparasitación',
            'reason' => 'motivo de consulta',
            'awareness' => 'conciencia',
            'weight' => 'peso',
            'mucosa' => 'mucosa',
            'tllc' => 'tiempo de llenado capilar',
            'fc' => 'frecuencia cardiaca',
            'fr' => 'frecuencia respiratoria',
            'spo2' => '%SPO2',
            'temperature' => 'temperatura',
            'card_con' => 'cardipatia congenita',
            'temper' => 'temperamento',
            'state' => 'estado',
            'linfonodulos' => 'linfonódulos',
            'aus-card' => 'ausciltación cardiaca',
            'aus-resp' => 'ausciltación respiratoria',
            'tegumento' => 'tagumento',
            'palpacion-abd' => 'palpación abdominal',
            'diagnostico' => 'diagnóstico presuntivo',
            'hto' => 'HTO',
            'glucosa' => 'glucosa',
            'pt' => 'tiempo de protombina',
            'du-refrac' => 'DU REFRACTOMETRO',
            'frotis' => 'frotis',
            'hemograma' => 'hemograma',
            'hemograma_image_url' => 'imagen del hemograma',
            'ecografia' => 'ecografía',
            'ecografia_image_url' => 'imagen de la ecografía',
            'abdominal' => 'abdominal',
            'gestacional' => 'gestacional',
            'ecofast' => 'ecofast',
            'tfast' => 'tfast',
            'vetbles' => 'vetbles',
            'bioquimica' => 'bioquímica',
            'radiografias' => 'radiografía',
            'radiografias_image_url' => 'imagen de la radiografía',
            'vistas' => 'vistas',
            'zona' => 'zona',
            'electrolitos' => 'electrolitos',
            'bilir' => 'bilir',
            'ceto' => 'ceto',
            'sang' => 'sang',
            'prot' => 'prot',
            'nitri' => 'nitri',
            'leu' => 'leu',
            'glu' => 'glu',
            'ph' => 'ph',
            'plan' => 'plan',
        ];
    }
    public function withValidator($validator)
    {
        $validator->sometimes('hemograma_image_url', 'image', function ($input) {
            return $input->hemograma_image_url instanceof \Illuminate\Http\UploadedFile;
        });
        $validator->sometimes('ecografia_image_url', 'image', function ($input) {
            return $input->ecografia_image_url instanceof \Illuminate\Http\UploadedFile;
        });
        $validator->sometimes('radiografias_image_url', 'image', function ($input) {
            return $input->radiografias_image_url instanceof \Illuminate\Http\UploadedFile;
        });
    }
}
