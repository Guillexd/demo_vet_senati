<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create([
            'name' => 'Cortes clásicos.',
            'price' => 35.00,
        ]);
        Service::create([
            'name' => 'Cortes mixtos.',
            'price' => 45.00,
        ]);
        Service::create([
            'name' => 'Cortes estéticos',
            'price' => 50.00,
        ]);
        Service::create([
            'name' => 'Baños y cepillados (MANTOS LARGOS)',
            'price' => 70.00,
        ]);
        Service::create([
            'name' => 'Baños y cepillados (MANTOS CORTOS)',
            'price' => 30.00,
        ]);
        Service::create([
            'name' => 'Baños medicados',
            'price' => 50.00,
        ]);
        Service::create([
            'name' => 'Castración',
            'price' => 100.00,
        ]);
        Service::create([
            'name' => 'Desparasitación de 5K a 10K',
            'price' => 10.00,
        ]);
    }
}
