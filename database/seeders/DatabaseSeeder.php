<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Sales;
use App\Models\Service;
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
            ProductSeeder::class,
            CashRegisterSeeder::class,
            ExpenseSeeder::class,
            SalesSeeder::class,
        ]);

        $sale = Sales::firstOrFail();
        $uuid = $sale->code . '-' . Str::padLeft($sale->correlativo, 7, '0');

        $products = [
            (object) [
                'cash_registerable_id' => 1,
            ],
            (object) [
                'cash_registerable_id' => 7,
            ],
            (object) [
                'cash_registerable_id' => 11,
            ],
            (object) [
                'cash_registerable_id' => 14,
            ],
            (object) [
                'cash_registerable_id' => 19,
            ],
            (object) [
                'cash_registerable_id' => 27,
            ],
            (object) [
                'cash_registerable_id' => 37,
            ],
            (object) [
                'cash_registerable_id' => 38,
            ],
            (object) [
                'cash_registerable_id' => 39,
            ],
            (object) [
                'cash_registerable_id' => 40,
            ]
        ];

        foreach ($products as $record) {
            $product = Product::find($record->cash_registerable_id);
            $record->quantity = rand(1, 30);
            $record->subtotal = $product->price * $record->quantity;
            $record->cash_register_id = 49;
            $record->cash_registerable_type = 'App\\Models\\Product';
            $record->voucher_id = $uuid;
            $record->customer_id = 40;
            $record->transactions_type = 1;
            $record->description = 'Este es un producto que se vende mucho.';
            $record->created_at = now();

            DB::table('cash_registerables')->insert((array) $record);
        }

        $services = [
            (object) [
                'cash_registerable_id' => 1,
            ],
            (object) [
                'cash_registerable_id' => 2,
            ],
            (object) [
                'cash_registerable_id' => 3,
            ],
            (object) [
                'cash_registerable_id' => 4,
            ],
            (object) [
                'cash_registerable_id' => 5,
            ],
            (object) [
                'cash_registerable_id' => 6,
            ],
            (object) [
                'cash_registerable_id' => 7,
            ],
            (object) [
                'cash_registerable_id' => 8,
            ],
        ];

        $sale->correlativo = $sale->correlativo + 1;
        $uuid = $sale->code . '-' . Str::padLeft($sale->correlativo, 7, '0');

        foreach ($services as $record) {
            $service = Service::find($record->cash_registerable_id);
            $record->quantity = rand(1, 15);
            $record->subtotal = $service->price * $record->quantity;
            $record->cash_register_id = 49;
            $record->cash_registerable_type = 'App\\Models\\Service';
            $record->voucher_id = $uuid;
            $record->customer_id = 37;
            $record->transactions_type = 1;
            $record->description = 'Este es un servicio muy solicitado.';
            $record->created_at = now();

            DB::table('cash_registerables')->insert((array) $record);
        }

        $expenses = [
            (object) [
                'cash_registerable_id' => 1,
                'subtotal' => 188.10,
            ],
            (object) [
                'cash_registerable_id' => 2,
                'subtotal' => 44.00,
            ],
            (object) [
                'cash_registerable_id' => 3,
                'subtotal' => 20.50,
            ],
            (object) [
                'cash_registerable_id' => 5,
                'subtotal' => 5.10,
            ],
            (object) [
                'cash_registerable_id' => 7,
                'subtotal' => 14.00,
            ],
            (object) [
                'cash_registerable_id' => 9,
                'subtotal' => 22.30,
            ],
        ];

        foreach ($expenses as $record) {
            $record->cash_register_id = 49;
            $record->cash_registerable_type = 'App\\Models\\Expense';
            $record->transactions_type = 2;
            $record->created_at = now();

            DB::table('cash_registerables')->insert((array) $record);
        }

        $sale->correlativo = $sale->correlativo + 1;
        $sale->save();
    }
}
