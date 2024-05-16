<?php

namespace App\Exports;

use App\Models\CashRegister;
use App\Models\Customer;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ServicesPerMonthSheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
{
    private $month;
    private $year;

    public function __construct(int $month, int $year)
    {
        $this->month = $month;
        $this->year  = $year;
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $cashRegisters = CashRegister::with('services')
            ->whereMonth('created_at', $this->month)
            ->whereYear('created_at', $this->year)
            ->get();

        $monthlyBoxes = $cashRegisters->map(function ($cashRegister) {
            return $cashRegister->services->map(function ($service) {
                $customer = Customer::with('identity_document')->find($service->pivot->customer_id);
                return [
                    'name' => $service->name,
                    'price' => $service->price,
                    'client_name' => $customer->name ?? "-",
                    'client_doc' => $customer->identity_document?->description ?? "-",
                    'client_doc_numb' => $customer->document_number ?? "-",
                    'quantity' => $service->pivot->quantity,
                    'subtotal' => $service->pivot->subtotal,
                ];
            });
        });

        return $monthlyBoxes;
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
            'subtotal'
        ];
    }

    public function title(): string
    {
        return 'Servicios-' . $this->month . '-' . $this->year;
    }
}
