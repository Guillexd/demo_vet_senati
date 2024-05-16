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
        Schema::create('cash_registerables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cash_register_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('cash_registerable_id');
            $table->string('cash_registerable_type', 100);
            $table->smallInteger('transactions_type')->nullable()->comment('1 => "ingreso", 2 => "egreso"');
            $table->uuid('voucher_id')->nullable()->comment("Si es ingreso");
            $table->foreignId('customer_id')->nullable()->comment("Si es ingreso");
            $table->foreignId('user_id')->nullable()->comment("Si es ingreso");
            $table->decimal('quantity', 8, 2)->nullable()->comment("Si elije ingreso");
            $table->decimal('subtotal', 8, 2)->comment("Ya sea ingreso o egreso");
            $table->string('description')->nullable()->comment("Si es ingreso");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_registerables');
    }
};
