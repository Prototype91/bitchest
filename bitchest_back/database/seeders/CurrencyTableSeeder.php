<?php

namespace Database\Seeders;

use Facade\Ignition\DumpRecorder\Dump;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class CurrencyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $baseUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=';

        // End URL
        $endUrl = '&order=market_cap_desc&per_page=10&page=1&sparkline=true';

        $coins = [
            "{$baseUrl}ethereum{$endUrl}",
            "{$baseUrl}ripple{$endUrl}",
            "{$baseUrl}iota{$endUrl}",
            "{$baseUrl}cardano{$endUrl}",
            "{$baseUrl}stellar{$endUrl}",
            "{$baseUrl}bitcoin-cash{$endUrl}",
            "{$baseUrl}nem{$endUrl}",
            "{$baseUrl}bitcoin{$endUrl}",
            "{$baseUrl}litecoin{$endUrl}",
            "{$baseUrl}dash{$endUrl}"
        ];

        $makeRequest = function($value) {
            return Http::get($value);
        };

        $returnValue = function ($value) {
            return [
                "coin_id" => $value[0]["id"],
                "name" => $value[0]["name"],
                "symbol" => $value[0]["symbol"],
            ];
        };

        $responsesArray = array_map($makeRequest, $coins);
        $eachResponseArray = array_map($returnValue, $responsesArray);

        foreach ($eachResponseArray as $value) {
            DB::table('currency')->insert([$value]);
        };
    }
}
