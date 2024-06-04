<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->decimal('price', 8, 2);
            $table->decimal('purchase_price', 8, 2);
            $table->smallInteger('stock');
            $table->decimal('utility', 8, 2);
            $table->string('serie', 20)->unique()->nullable();
            $table->string('product_image_url')->default('/image/juguete.jpeg');
            $table->string('product_public_id')->nullable();
            $table->dateTimeTz('due_date')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
