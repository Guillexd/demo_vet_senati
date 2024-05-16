<?php

namespace App\Exports;

use App\Models\CashRegister;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ExpensesPerMonthSheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
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
        $cashRegisters = CashRegister::with('expenses')
            ->whereMonth('created_at', $this->month)
            ->whereYear('created_at', $this->year)
            ->get();

        $monthlyBoxes = $cashRegisters->map(function ($cashRegister) {
            return $cashRegister->expenses->map(function ($expense) {
                return [
                    'subtotal' => $expense->pivot->subtotal,
                    'reason' => $expense->reason,
                ];
            });
        });
        return $monthlyBoxes;
    }

    public function headings(): array
    {
        return [
            'subtotal',
            'Razón',
        ];
    }

    public function title(): string
    {
        return 'Egresos-' . $this->month . '-' . $this->year;
    }
}
