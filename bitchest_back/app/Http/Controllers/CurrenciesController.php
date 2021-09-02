<?php

namespace App\Http\Controllers;

use App\Models\Currency;

class CurrenciesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $currencies = Currency::all();

        return response([
            'currencies' => $currencies,
            'message' => 'Currencies récupérées avec succès'
        ], 200);
    }
}
