<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->randomFloat(2, 5, 50);
        $purchasePrice = $price - fake()->randomFloat(2, 2, 30);
        $utility = $price - $purchasePrice;

        return [
            'name' => fake()->company(),
            'price' => $price,
            'purchase_price' => $purchasePrice,
            'stock' => fake()->numberBetween(50, 300),
            'utility' => $utility,
            'description' => fake()->realText(fake()->numberBetween(20, 300),),
            // 'due_date' => fake()->dateTimeBetween('1 year ago', 'now'),
        ];
    }
}
