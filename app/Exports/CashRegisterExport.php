<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CashRegisterExport implements WithMultipleSheets
{
    use Exportable;
    private $id;

    public function __construct(int $id)
    {
        $this->id = $id;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function sheets(): array
    {
        return [
            new ProductsPerDaySheet($this->id),
            new ServicesPerDaySheet($this->id),
            new ExpensesPerDaySheet($this->id),
            new VouchersPerDaySheet($this->id)
        ];
    }
}
