<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $doc_type = fake()->numberBetween(1, 2);
        $doc_num = $doc_type == 1 ? fake()->numberBetween(10000000, 99999999) : fake()->numberBetween(10000000000, 99999999999);
        return [
            'name' => fake()->name(),
            'identity_document_id' => $doc_type,
            'document_number' => $doc_num,
            'first_phone' => fake()->numberBetween(900000000, 999999999),
            'second_phone' => fake()->numberBetween(900000000, 999999999),
            'direction' => fake()->address(),
        ];
    }
}
