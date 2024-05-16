<?php

namespace Database\Seeders;

use App\Models\Sales;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolSeeder::class,
            UserSeeder::class,
            IdentityDocumentSeeder::class,
            CustomerSeeder::class,
            BreedSeeder::class,
            PetSeeder::class,
            ServiceSeeder::class,
            // PetHistorySeeder::class,
            ProductSeeder::class,
            CashRegisterSeeder::class,
            ExpenseSeeder::class,
            SalesSeeder::class,
        ]);

        // $sale = Sales::firstOrFail();
        // $uuid = $sale->code . '-' . Str::padLeft($sale->correlativo, 7, '0');

        // $products = [
        //     (object) [
        //         'cash_registerable_id' => 1,
        //         'customer_id' => 1,
        //         'quantity' => 21,
        //         'subtotal' => 188.10,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 2,
        //         'customer_id' => 1,
        //         'quantity' => 7,
        //         'subtotal' => 44.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 3,
        //         'customer_id' => 1,
        //         'quantity' => 16,
        //         'subtotal' => 300.50,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 15,
        //         'customer_id' => 9,
        //         'quantity' => 2,
        //         'subtotal' => 30.50,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 16,
        //         'customer_id' => 9,
        //         'quantity' => 1,
        //         'subtotal' => 18.20,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 17,
        //         'customer_id' => 9,
        //         'quantity' => 2,
        //         'subtotal' => 9.90,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 29,
        //         'customer_id' => 15,
        //         'quantity' => 7,
        //         'subtotal' => 77.50,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 30,
        //         'customer_id' => 15,
        //         'quantity' => 1,
        //         'subtotal' => 15.50,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 31,
        //         'customer_id' => 15,
        //         'quantity' => 20,
        //         'subtotal' => 100.00,
        //     ]
        // ];

        // foreach ($products as $record) {
        //     $record->cash_register_id = 1;
        //     $record->cash_registerable_type = 'App\\Models\\Product';
        //     $record->voucher_id = $uuid;
        //     $record->transactions_type = 1;
        //     $record->description = 'Este es un producto que se vende mucho.';
        //     $record->created_at = now();

        //     DB::table('cash_registerables')->insert((array) $record);
        // }

        // $services = [
        //     (object) [
        //         'cash_registerable_id' => 1,
        //         'customer_id' => 1,
        //         'quantity' => 1,
        //         'subtotal' => 35.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 3,
        //         'customer_id' => 1,
        //         'quantity' => 1,
        //         'subtotal' => 50.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 5,
        //         'customer_id' => 1,
        //         'quantity' => 1,
        //         'subtotal' => 30.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 2,
        //         'customer_id' => 9,
        //         'quantity' => 2,
        //         'subtotal' => 90.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 4,
        //         'customer_id' => 9,
        //         'quantity' => 1,
        //         'subtotal' => 70.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 6,
        //         'customer_id' => 9,
        //         'quantity' => 7,
        //         'subtotal' => 50.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 2,
        //         'customer_id' => 25,
        //         'quantity' => 1,
        //         'subtotal' => 90.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 3,
        //         'customer_id' => 25,
        //         'quantity' => 1,
        //         'subtotal' => 50.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 4,
        //         'customer_id' => 25,
        //         'quantity' => 1,
        //         'subtotal' => 70.00,
        //     ],
        // ];

        // foreach ($services as $record) {
        //     $record->cash_register_id = 1;
        //     $record->cash_registerable_type = 'App\\Models\\Service';
        //     $record->voucher_id = $uuid;
        //     $record->transactions_type = 1;
        //     $record->description = 'Este es un servicio muy solicitado.';
        //     $record->created_at = now();

        //     DB::table('cash_registerables')->insert((array) $record);
        // }

        // $expenses = [
        //     (object) [
        //         'cash_registerable_id' => 1,
        //         'subtotal' => 188.10,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 2,
        //         'subtotal' => 44.00,
        //     ],
        //     (object) [
        //         'cash_registerable_id' => 3,
        //         'subtotal' => 20.50,
        //     ]
        // ];

        // foreach ($expenses as $record) {
        //     $record->cash_register_id = 1;
        //     $record->cash_registerable_type = 'App\\Models\\Expense';
        //     $record->transactions_type = 2;
        //     $record->created_at = now();

        //     DB::table('cash_registerables')->insert((array) $record);
        // }

        // $sale->correlativo = $sale->correlativo + 1;
        // $sale->save();
    }
}
