<?php

namespace App\Exports;

use App\Models\CashRegister;
use App\Models\Customer;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ProductsPerDaySheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
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
        return $cash_register->products->map(function ($product) {
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
                'date' => $product->pivot->created_at,
            ];
        });
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
            'Subtotal',
            'Fecha'
        ];
    }

    public function title(): string
    {
        return 'Productos-' . $this->id;
    }
}
