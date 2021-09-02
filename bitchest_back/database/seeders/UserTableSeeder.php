<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'firstname' => 'Dylan',
                'lastname' => 'Lecomte',
                'address' => '24 Avenue Gambetta',
                'phone' => '0680789255',
                'email' => 'dylan@dylan.fr',
                'balance' => 50000,
                'password' => Hash::make('dylan'),
                'elevation' => 'admin'
            ],
            [
                'firstname' => 'Sandrine',
                'lastname' => 'Oyarsabal',
                'address' => '88 Avenue Gambetta',
                'phone' => '0690872635',
                'email' => 'sandrine@oyarsabal.fr',
                'balance' => 50000,
                'password' => Hash::make('sandrine'),
                'elevation' => 'admin'
            ],
            [
                'firstname' => 'Kenny',
                'lastname' => 'Herillard',
                'address' => '54 Boulevard Bessières',
                'phone' => '0687253891',
                'email' => 'kenny@kenny.fr',
                'balance' => 50000,
                'password' => Hash::make('kenny'),
                'elevation' => 'user'
            ],
            [
                'firstname' => 'Jean',
                'lastname' => 'Dupont',
                'address' => '45 Boulevard Raspail',
                'phone' => '0658927367',
                'email' => 'jean@dupont.fr',
                'balance' => 50000,
                'password' => Hash::make('jean'),
                'elevation' => 'user'
            ],
        ]);
    }
}
