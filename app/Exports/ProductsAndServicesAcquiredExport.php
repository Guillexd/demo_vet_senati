<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ProductsAndServicesAcquiredExport implements WithMultipleSheets
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
            new ProductsMostAcquiredSheet($this->month, $this->year),
            new ServicesMostAcquiredSheet($this->month, $this->year)
        ];
    }
}
