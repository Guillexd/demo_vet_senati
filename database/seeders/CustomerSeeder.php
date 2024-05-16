<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Customer::factory(24)->create();
        Customer::factory()->create([
            'name' => 'Alicia Contreras Porras',
            'identity_document_id' => 1,
            'document_number' => '25948736',
        ]);
        Customer::factory()->create([
            'name' => 'María López Aliaga',
            'identity_document_id' => 1,
            'document_number' => '48965275',
        ]);
        Customer::factory()->create([
            'name' => 'Esther Juana',
            'identity_document_id' => 1,
            'document_number' => '73229306',
        ]);
        Customer::factory()->create([
            'name' => 'Juana Calixto Mendoza',
            'identity_document_id' => 2,
            'document_number' => '12345678954',
        ]);
        Customer::create([
            'name' => 'Cliente anónimo'
        ]);
    }
}
