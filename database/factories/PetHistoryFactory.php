<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PetHistory>
 */
class PetHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pet_id' => fake()->numberBetween(1, 36),
            'last_deworming' => fake()->dateTimeBetween('-1 year', 'now'),
            'reason' => fake()->realText(120),
        ];
    }
}
