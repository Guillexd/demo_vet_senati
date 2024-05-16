<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $names = [
        //     "Medicamento para perros",
        //     "Collar antipulgas para gatos",
        //     "Alimento balanceado para cachorros",
        //     "Champú para perros con piel sensible",
        //     "Juguete masticable para perros",
        //     "Pipetas antipulgas para perros y gatos",
        //     "Cepillo de dientes para perros",
        //     "Arena aglomerante para gatos",
        //     "Snack dental para perros",
        //     "Comedero automático para mascotas",
        //     "Cama ortopédica para perros mayores",
        //     "Peine antipulgas para gatos",
        //     "Bola de heno para conejos",
        //     "Shampoo antipulgas para cachorros",
        //     "Piedra mineral para roedores",
        //     "Cepillo de pelo largo para gatos",
        //     "Suplemento vitamínico para hurones",
        //     "Jaula para hamsters",
        //     "Hueso de cuero natural para perros",
        //     "Cortaúñas para conejos y roedores",
        //     "Champú para perros de pelo blanco",
        //     "Arena aglomerante con aroma a lavanda para gatos",
        //     "Alimento húmedo para cachorros de razas pequeñas",
        //     "Cepillo de dientes con sabor a pollo para perros",
        //     "Pelota de goma resistente para masticar",
        //     "Pipetas antipulgas y garrapatas para perros grandes",
        //     "Camita con forma de cueva para gatos tímidos",
        //     "Snack natural de zanahoria para conejos",
        //     "Bebedero automático para aves",
        //     "Arnés reflectante para perros nocturnos",
        //     "Piedra mineral para desgaste de uñas de roedores",
        //     "Suplemento vitamínico para fortalecer el pelaje de gatos",
        //     "Jaula grande con ruedas para hurones activos",
        //     "Collar ajustable con luz LED para perros de noche",
        //     "Comedero elevado para gatos con problemas de digestión",
        //     "Cama ortopédica con sistema de calor para perros artríticos",
        // ];

        // foreach ($names as $productName) {
        //     Product::factory()->create([
        //         'name' => $productName,
        //     ]);
        // }

        // $products = [
        //     (object) [
        //         'name' => 'Juguete interactivo con dispensador de premios para gatos inteligentes',
        //         'url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147873/ReyCan/uas6dlwrtoopl2kjkbdv.jpg',
        //         'id' => 'ReyCan/uas6dlwrtoopl2kjkbdv'
        //     ],
        //     (object) [
        //         'name' => 'Cortaúñas de precisión para aves de pequeño tamaño',
        //         'url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147891/ReyCan/lfrllrjotq1xe4qau9jw.jpg',
        //         'id' => 'ReyCan/lfrllrjotq1xe4qau9jw'
        //     ],
        //     (object) [
        //         'name' => 'Bebedero de cristal antigoteo para roedores delicados',
        //         'url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147912/ReyCan/jlmem8ctuupbw9n1meoz.jpg',
        //         'id' => 'ReyCan/jlmem8ctuupbw9n1meoz'
        //     ],
        //     (object) [
        //         'name' => 'Pelota de heno con hierbas aromáticas para conejos mimados',
        //         'url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147922/ReyCan/zqjwbypdavrwkcrphnfq.jpg',
        //         'id' => 'ReyCan/zqjwbypdavrwkcrphnfq'
        //     ],
        // ];

        // foreach ($products as $product) {
        //     Product::factory()->create([
        //         'name' => $product->name,
        //         'product_image_url' => $product->url,
        //         'product_public_id' => $product->id,
        //     ]);
        // }

        Product::create([
            'name' => 'Churru',
            'price' => 13.40,
            'purchase_price' => 8.90,
            'stock' => 14,
            'utility' => 4.50,
            'product_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1711552401/ReyCan/kthfwf06fmbjxgm6ulwd.jpg',
            'product_public_id' => null,
            'due_date' => '2025-06-07 16:39:00',
            'description' => 'Para gato',
        ]);
        Product::create([
            'name' => 'Carnaza',
            'price' => 15.00,
            'purchase_price' => 9.80,
            'stock' => 17,
            'utility' => 5.20,
            'product_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1711823127/ReyCan/ddiksctxdpkvkgjytjqr.jpg',
            'product_public_id' => null,
            'due_date' => '2025-06-25 20:55:00',
            'description' => 'Para perros',
        ]);
        Product::create([
            'name' => 'Isabelinos talla S',
            'price' => 16.00,
            'purchase_price' => 7.80,
            'stock' => 11,
            'utility' => 8.20,
            'product_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1712020706/ReyCan/nk6snypgapnuci0klqu4.jpg',
            'product_public_id' => null,
        ]);
        Product::create([
            'name' => 'Leche milk DOG',
            'price' => 16.00,
            'purchase_price' => 10.80,
            'stock' => 3,
            'utility' => 5.20,
            'product_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1712107500/ReyCan/j1lqlktvczrknfzaltk3.jpg',
            'product_public_id' => null,
            'due_date' => '2024-05-28 18:01:00',
            'description' => 'CANTIDAD DE GRASA O ALGUNOS COMPONETES',
        ]);
        Product::create([
            'name' => 'Pesa de plástico',
            'price' => 5.00,
            'purchase_price' => 3.00,
            'stock' => 18,
            'utility' => 2.00,
            'product_image_url' => 'https://res.cloudinary.com/dfpspbjlq/image/upload/v1709147581/ReyCan/gfwsetlbjvggxiz0euce.jpg',
            'product_public_id' => null,
        ]);
    }
}
