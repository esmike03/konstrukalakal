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
        Schema::create('convo_lists', function (Blueprint $table) {
            $table->id();
            $table->string('sender_id');
            $table->string('recipient_id');
            $table->string('material_id');
            $table->string('start');
            $table->string('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('convo_lists');
    }
};
