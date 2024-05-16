<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ServicesMostAcquiredSheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
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
            ->select('services.name', DB::raw('SUM(quantity) as repeticiones'))
            ->join('services', 'cash_registerables.cash_registerable_id', '=', 'services.id')
            ->where('cash_registerable_type', '=', 'App\Models\Service')
            ->whereMonth('cash_registerables.created_at', $this->month)
            ->whereYear('cash_registerables.created_at', $this->year)
            ->groupBy('services.name')
            ->orderByDesc('repeticiones')
            ->get();

        return $sales;
    }

    public function headings(): array
    {
        return [
            'Servicio',
            'número de veces adquirido',
        ];
    }

    public function title(): string
    {
        return 'Servicios-' . $this->month . '-' . $this->year;
    }
}
