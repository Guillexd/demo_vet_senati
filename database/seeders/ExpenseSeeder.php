<?php

namespace Database\Seeders;

use App\Models\Expense;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reasons = [
            "Préstamo para emergencias veterinarias, cubrir gastos de tratamiento urgente.",
            "Pérdida de dinero debido a productos dañados o robados.",
            "Compra de comestibles.",
            "Pago de facturas de servicios públicos.",
            "Compras de ropa y accesorios.",
            "Gastos de transporte.",
            "Pago de servicios de telecomunicaciones.",
            "Compra de electrodomésticos.",
            "Gastos en entretenimiento (cine, conciertos, etc.)",
            "Pago de membresías o suscripciones (gimnasio, streaming, etc.)",
        ];

        foreach ($reasons as $reason) {
            Expense::create([
                'reason' => $reason
            ]);
        }
    }
}
