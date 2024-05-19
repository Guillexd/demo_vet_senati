<?php

namespace Database\Seeders;

use App\Models\CashRegister;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CashRegisterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CashRegister::factory(48)->create();
        CashRegister::create([
            'initial_amount' => 0.00
        ]);
    }
}
