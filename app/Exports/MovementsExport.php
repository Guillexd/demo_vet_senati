<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class MovementsExport implements WithMultipleSheets
{
    use Exportable;
    private $month;
    private $year;

    public function __construct(int $year, int $month)
    {
        $this->month = $month;
        $this->year  = $year;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function sheets(): array
    {
        return [
            new ProductsPerMonthSheet($this->month, $this->year),
            new ServicesPerMonthSheet($this->month, $this->year),
            new ExpensesPerMonthSheet($this->month, $this->year),
            new VouchersPerMonthSheet($this->month, $this->year)
        ];
    }
}
