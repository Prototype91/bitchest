<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'currency_id',
        'user_id',
        'currency_value',
        'currency_rate',
        'amount',
        'type',
        'name',
        'symbol',
        'sold',
        'rsi'
    ];

    public function users() {
        return $this->belongsTo(User::class);
    }
}
