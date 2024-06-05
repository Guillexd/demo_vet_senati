<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test',
            'email' => 'prueba@gmail.com',
            'rol_id' => 1,
        ]);
        User::factory()->create([
            'name' => 'Obrero',
            'email' => 'lowerclass@gmail.com',
            'rol_id' => 2,
        ]);
        User::factory()->create([
            'name' => 'BLADIMIR BONILLA QUINTO',
            'email' => 'reycan_huancayo@hotmail.com',
            'rol_id' => 1,
            'dni' => '47839784',
            'phone' => '925941194',
            'direction' => 'jr saul muñoz 223 - chilca',
        ]);
        User::factory()->create([
            'name' => 'CARLOS GOMEZ PAUCAR',
            'email' => 'carlos01_2014@gmail.com',
            'rol_id' => 2,
            'dni' => '23259627',
            'phone' => '940236875',
            'direction' => 'Av sauces 659 - Tambo',
        ]);
        User::factory()->create([
            'name' => 'ESTEFANI VILCAHUAMAN CARHUAMACA',
            'email' => 'evilcahuamancarhuamaca@gmail.com',
            'rol_id' => 2,
            'dni' => '73229306',
            'phone' => '959616717',
            'direction' => 'Psj. Los Lirios s/n La Punta-Sapallanga',
        ]);
    }
}
