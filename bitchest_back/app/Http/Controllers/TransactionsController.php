<?php

namespace App\Http\Controllers;
use App\Models\Transaction;

use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transactions = Transaction::all();

        return response([
            'transactions' => $transactions,
            'message' => 'Transactions récupérées avec succès'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "currency_id" => "required",
            "currency_value" => "required",
            "type" => "required",
            "user_id" => "required",
            "amount" => "required"
        ]);

        return Transaction::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Transaction::find($id);
    }
}
