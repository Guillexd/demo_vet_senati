<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class VouchersPerMonthSheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
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
        return DB::table('cash_registerables')
            ->select(
                DB::raw('MAX(cash_register_id) AS cash_id'),
                'voucher_id',
                DB::raw('(SELECT name FROM customers WHERE id = MAX(customer_id)) AS customer'),
                DB::raw('(SELECT abbreviation FROM identity_documents JOIN customers ON identity_documents.id = customers.identity_document_id WHERE customers.id = MAX(customer_id)) AS abbreviation'),
                DB::raw('(SELECT document_number FROM customers WHERE id = MAX(customer_id)) AS doc_customer'),
                DB::raw('SUM(subtotal) as total'),
                DB::raw('MAX(cash_registerables.created_at) AS max_created_at'),
            )
            ->join('customers', 'cash_registerables.customer_id', '=', 'customers.id')
            ->orderByDesc('max_created_at')
            ->groupBy(['voucher_id', 'customer_id'])
            ->whereNotNull('voucher_id')
            ->whereMonth('cash_registerables.created_at', $this->month)
            ->whereYear('cash_registerables.created_at', $this->year)
            ->get();
    }

    public function headings(): array
    {
        return [
            'Número de caja',
            'Código',
            'Cliente',
            'Tipo de documento',
            'Número de documento',
            'Total',
            'Fecha',
        ];
    }

    public function title(): string
    {
        return 'Vouchers-' . $this->month . '-' . $this->year;
    }
}
