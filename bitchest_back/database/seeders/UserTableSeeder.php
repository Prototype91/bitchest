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
                'name' => 'dylan',
                'email' => 'dylan@dylan.fr',
                'password' => Hash::make('dylan'),
                'elevation' => 'admin'
            ],
            [
                'name' => 'kenny',
                'email' => 'kenny@kenny.fr',
                'password' => Hash::make('kenny'),
                'elevation' => 'user'
            ]
        ]);
    }
}
