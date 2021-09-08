<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedInteger('currency_id');
            $table->foreign('currency_id')->references('id')->on('currencies');
            $table->unsignedDouble('currency_value');
            $table->unsignedDouble('currency_rate');
            $table->string('name');
            $table->string('symbol');
            $table->float('amount');
            $table->float('rsi')->nullable();
            $table->boolean('type');
            $table->boolean('sold');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
