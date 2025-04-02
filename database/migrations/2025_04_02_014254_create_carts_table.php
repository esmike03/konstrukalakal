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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            // Foreign key to the users table
            $table->unsignedBigInteger('user_id');
            // Foreign key to the materials table
            $table->unsignedBigInteger('material_id');
            // Quantity of the material added to the cart
            $table->integer('quantity')->default(1);
            $table->timestamps();

            // Setting up the foreign keys
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');

            $table->foreign('material_id')
                  ->references('id')
                  ->on('materials')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
