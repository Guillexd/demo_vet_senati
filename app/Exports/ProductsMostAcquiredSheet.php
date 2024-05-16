<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ProductsMostAcquiredSheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
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
        $sales = DB::table('cash_registerables')
            ->select('products.name', 'products.stock', DB::raw('SUM(quantity) as repeticiones'))
            ->join('products', 'cash_registerables.cash_registerable_id', '=', 'products.id')
            ->where('cash_registerable_type', '=', 'App\Models\Product')
            ->whereMonth('cash_registerables.created_at', $this->month)
            ->whereYear('cash_registerables.created_at', $this->year)
            ->groupBy('products.name', 'products.stock')
            ->orderByDesc('repeticiones')
            ->get();

        return $sales;
    }

    public function headings(): array
    {
        return [
            'Producto',
            'Stock actual',
            'número de veces adquirido',
        ];
    }

    public function title(): string
    {
        return 'Productos-' . $this->month . '-' . $this->year;
    }
}
