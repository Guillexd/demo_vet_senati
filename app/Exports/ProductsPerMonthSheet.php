<?php

namespace App\Exports;

use App\Models\CashRegister;
use App\Models\Customer;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ProductsPerMonthSheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
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
        $cashRegisters = CashRegister::with('products')
            ->whereMonth('created_at', $this->month)
            ->whereYear('created_at', $this->year)
            ->get();

        $monthlyBoxes = $cashRegisters->map(function ($cashRegister) {
            return $cashRegister->products->map(function ($product) {
                $customer = Customer::with('identity_document')->find($product->pivot->customer_id);
                return [
                    'name' => $product->name,
                    'price' => $product->price,
                    'stock' => $product->stock,
                    'client_name' => $customer->name ?? "-",
                    'client_doc' => $customer->identity_document?->description ?? "-",
                    'client_doc_numb' => $customer->document_number ?? "-",
                    'quantity' => $product->pivot->quantity,
                    'subtotal' => $product->pivot->subtotal,
                ];
            });
        });
        return $monthlyBoxes;
    }

    public function headings(): array
    {
        return [
            'Producto',
            'Precio',
            'Stock',
            'Cliente',
            'Tipo de documento',
            'Número de documento',
            'Cantidad',
            'subtotal'
        ];
    }

    public function title(): string
    {
        return 'Productos-' . $this->month . '-' . $this->year;
    }
}
