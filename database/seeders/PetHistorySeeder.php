<?php

namespace Database\Seeders;

use App\Models\PetHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PetHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PetHistory::factory(24)->create();
    }
}
