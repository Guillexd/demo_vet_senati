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
        Schema::create('pet_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained()->cascadeOnDelete();
            $table->dateTimeTz('last_deworming')->nullable();
            $table->string('reason', 255);
            $table->string('awareness', 20)->nullable();
            $table->string('weight', 20)->nullable();
            $table->string('mucosa', 20)->nullable();
            $table->string('tllc', 20)->nullable();
            $table->string('fc', 20)->nullable();
            $table->string('fr', 20)->nullable();
            $table->string('spo2', 20)->nullable();
            $table->string('temperature', 20)->nullable();
            $table->string('card_con', 20)->nullable();
            $table->string('temper', 20)->nullable();
            $table->string('state', 20)->nullable();
            $table->string('linfonodulos', 255)->nullable();
            $table->string('aus_card', 255)->nullable();
            $table->string('aus_resp', 255)->nullable();
            $table->string('tegumento', 255)->nullable();
            $table->string('palpacion_abd', 255)->nullable();
            $table->text('diagnostico')->nullable();
            $table->string('hto', 10)->nullable();
            $table->string('glucosa', 10)->nullable();
            $table->string('pt', 10)->nullable();
            $table->string('du_refrac', 10)->nullable();
            $table->string('frotis', 255)->nullable();
            $table->boolean('hemograma')->nullable()->default(0);
            $table->string('hemograma_image_url')->nullable();
            $table->string('hemograma_public_id')->nullable();
            $table->boolean('ecografia')->nullable()->default(0);
            $table->string('ecografia_image_url')->nullable();
            $table->string('ecografia_public_id')->nullable();
            $table->boolean('abdominal')->nullable()->default(0);
            $table->boolean('gestacional')->nullable()->default(0);
            $table->boolean('ecofast')->nullable()->default(0);
            $table->boolean('tfast')->nullable()->default(0);
            $table->boolean('vetbles')->nullable()->default(0);
            $table->boolean('bioquimica')->nullable()->default(0);
            $table->boolean('radiografias')->nullable()->default(0);
            $table->string('radiografias_image_url')->nullable();
            $table->string('radiografias_public_id')->nullable();
            $table->string('vistas', 100)->nullable();
            $table->string('zona', 255)->nullable();
            $table->text('electrolitos')->nullable();
            $table->string('bilir', 30)->nullable();
            $table->string('ceto', 30)->nullable();
            $table->string('sang', 30)->nullable();
            $table->string('prot', 30)->nullable();
            $table->string('nitri', 30)->nullable();
            $table->string('leu', 30)->nullable();
            $table->string('glu', 30)->nullable();
            $table->string('ph', 30)->nullable();
            $table->text('plan')->nullable();
            $table->dateTimeTz('next_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_histories');
    }
};
