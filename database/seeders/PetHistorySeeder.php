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
        // PetHistory::factory(24)->create();
        PetHistory::create([
            'pet_id' => 2,
            'reason' => 'Falta de amor.',
            'awareness' => 'Alerta',
            'state' => 'Ambulatorio',
            'ecografia' => 1,
            'ecografia_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1716699230/ReyCan/rhlqqucnk61hipzc8wj1.jpg',
            'radiografias' => 1,
            'radiografias_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1716700191/ReyCan/n5q0mutv6fvt62zokqiw.jpg',
            'plan' => 'Se le dara reposo en Miami.
            1. No debe juntarse con Motra.
            2. Evitar a los furros.
            3. Asi sanan ...',
            'next_date' => now()->addDays(13),
        ]);
    }
}
