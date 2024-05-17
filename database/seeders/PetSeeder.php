<?php

namespace Database\Seeders;

use App\Models\Pet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pet::factory(36)->create();
        // $images = [
        //     (object) [
        //         'url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147463/ReyCan/xcmkue1wxznar2whjz69.jpg',
        //         'id' => 'ReyCan/xcmkue1wxznar2whjz69'
        //     ],
        //     (object) [
        //         'url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147472/ReyCan/dagwjkh5wfemlpdgjky7.jpg',
        //         'id' => 'ReyCan/dagwjkh5wfemlpdgjky7'
        //     ],
        //     (object) [
        //         'url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147481/ReyCan/axxshihjqn5k7rcdeiti.jpg',
        //         'id' => 'ReyCan/axxshihjqn5k7rcdeiti'
        //     ],
        //     (object) [
        //         'url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147581/ReyCan/gfwsetlbjvggxiz0euce.jpg',
        //         'id' => 'ReyCan/gfwsetlbjvggxiz0euce'
        //     ],
        // ];

        // foreach ($images as $image) {
        //     Pet::factory()->create([
        //         'pet_image_url' => $image->url,
        //         'pet_public_id' => $image->id,
        //     ]);
        // }

        Pet::factory()->create([
            'name' => 'Coto',
            'customer_id' => 3,
            'breed_id' => 4,
            'pet_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1711552401/ReyCan/kthfwf06fmbjxgm6ulwd.jpg',
            'pet_public_id' => null,
            'observations' => null,
        ]);
        Pet::factory()->create([
            'name' => 'Mota',
            'customer_id' => 2,
            'breed_id' => 2,
            'pet_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1711823127/ReyCan/ddiksctxdpkvkgjytjqr.jpg',
            'pet_public_id' => null,
            'observations' => 'no hay observaciones.',
        ]);
        Pet::factory()->create([
            'name' => 'Sasha',
            'customer_id' => 5,
            'breed_id' => 5,
            'pet_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1712020706/ReyCan/nk6snypgapnuci0klqu4.jpg',
            'pet_public_id' => null,
            'observations' => null,
        ]);
        Pet::factory()->create([
            'name' => 'Fogel',
            'customer_id' => 5,
            'breed_id' => 6,
            'pet_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1712107500/ReyCan/j1lqlktvczrknfzaltk3.jpg',
            'pet_public_id' => null,
            'observations' => null,
        ]);
        Pet::factory()->create([
            'name' => 'Juan',
            'customer_id' => 1,
            'breed_id' => 3,
            'pet_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147581/ReyCan/gfwsetlbjvggxiz0euce.jpg',
            'pet_public_id' => null,
            'observations' => null,
        ]);
    }
}
