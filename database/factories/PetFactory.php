<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sex = fake()->randomElement(['Macho', 'Hembra']);
        $ce = $sex === 'Hembra' ? ['Esterilizada', 'Entero'] : ['Castrado', 'Entero'];
        return [
            'name' => fake()->firstName(),
            'age' => fake()->numberBetween(2, 30) . ' ' . fake()->randomElement(['días', 'semanas', 'meses', 'años']),
            'customer_id' => fake()->numberBetween(1, 24),
            'breed_id' => fake()->numberBetween(1, 12),
            'sex' => $sex,
            'ce' => fake()->randomElement($ce),
            'observations' => fake()->realText(120),
        ];
    }
}
