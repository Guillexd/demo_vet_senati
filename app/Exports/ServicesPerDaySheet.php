<?php

namespace App\Exports;

use App\Models\CashRegister;
use App\Models\Customer;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ServicesPerDaySheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
{
    private $id;

    public function __construct(int $id)
    {
        $this->id = $id;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $cash_register = CashRegister::find($this->id);
        return $cash_register->services->map(function ($service) {
            $customer = Customer::with('identity_document')->find($service->pivot->customer_id);
            return [
                'name' => $service->name,
                'price' => $service->price,
                'client_name' => $customer->name ?? "-",
                'client_doc' => $customer->identity_document?->description ?? "-",
                'client_doc_numb' => $customer->document_number ?? "-",
                'quantity' => $service->pivot->quantity,
                'subtotal' => $service->pivot->subtotal,
                'date' => $service->pivot->created_at,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Servicio',
            'Precio',
            'Cliente',
            'Tipo de documento',
            'Número de documento',
            'Cantidad',
            'Subtotal',
            'Fecha'
        ];
    }

    public function title(): string
    {
        return 'Servicios-' . $this->id;
    }
}
