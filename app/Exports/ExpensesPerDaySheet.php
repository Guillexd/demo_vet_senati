<?php

namespace App\Exports;

use App\Models\CashRegister;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ExpensesPerDaySheet implements FromCollection, WithTitle, WithHeadings, ShouldAutoSize
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
        return $cash_register->expenses->map(function ($expense) {
            return [
                'subtotal' => $expense->pivot->subtotal,
                'reason' => $expense->reason,
                'date' => $expense->pivot->created_at,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'subtotal',
            'Razón',
            'Fecha'
        ];
    }

    public function title(): string
    {
        return 'Egresos-' . $this->id;
    }
}
