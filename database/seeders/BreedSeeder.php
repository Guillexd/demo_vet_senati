<?php

namespace Database\Seeders;

use App\Models\Breed;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BreedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Breed::factory(12)->create();
        Breed::create([
            'name' => 'Sharpei (perro)'
        ]);
        Breed::create([
            'name' => 'Beagle (perro)'
        ]);
        Breed::create([
            'name' => 'Bulldog Frances (perro)'
        ]);
        Breed::create([
            'name' => 'Mestizo (perro)'
        ]);
        Breed::create([
            'name' => 'Rotwailer (perro)'
        ]);
        Breed::create([
            'name' => 'Pastor Alemán (perro)'
        ]);
    }
}
