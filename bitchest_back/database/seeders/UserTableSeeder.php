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
                'adress' => '24 avenue Gambetta',
                'phone' => '+33606060606',
                'email' => 'dylan@dylan.fr',
                'password' => Hash::make('dylan'),
                'elevation' => 'admin'
            ],
            [
                'name' => 'Kenny',
                'lastname' => 'Herillard',
                'adress' => '54 boulevar Bessières',
                'phone' => '+33606060607',
                'email' => 'kenny@kenny.fr',
                'password' => Hash::make('kenny'),
                'elevation' => 'user'
            ]
        ]);
    }
}
