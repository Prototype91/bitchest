<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
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
            "amount" => "required",
            "sold" => "required"
        ]);

        Transaction::create($request->all());

        $user = User::find($request->user_id);

        // Need to know if we buy or sell something
        if ($request->type) $user->balance = $user->balance - $request->amount;
        else $user->balance = $user->balance + $request->amount;

        $user->save();

        return response([
            'message' => 'Transactions créée avec succès'
        ], 200);
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

    // Updates the sold status of specific transactions
    public function updateTransactions($name)
    {
        $transactions = Transaction::where('name', $name)->get();

        $transactions->map(function($item) {
            $item->sold = true;
            $item->save();
         });

        return response([
            'message' => 'Transactions mises à jour'
        ], 200);
    }
}
