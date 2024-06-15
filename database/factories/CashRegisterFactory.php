<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CashRegister>
 */
class CashRegisterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $initial = fake()->randomFloat(2, 50, 300);
        $total = $initial * fake()->randomFloat(2, 2, 3);

        return [
            'initial_amount' => $initial,
            'state' => 0,
            'total' => $total,
            'created_at' => fake()->dateTimeBetween('1 year ago', 'now'),
        ];
    }
}
