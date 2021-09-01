<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();

        return response([
            'users' => $users,
            'message' => 'Utilisateurs récupérés avec succès'
        ], 200);
    }

    public function getTransactionsByUserId($id)
    {
        $user = User::find($id);
        return $user->transactions;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'min:8|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:8',
            'phone' => 'required|string',
            'address' => 'required|string'
        ]);

        $user = User::create([
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'email' => $fields['email'],
            'phone' => $fields['phone'],
            'address' => $fields['address'],
            'password' => bcrypt($fields['password']),
            'elevation' => 'user',
            'balance' => 0,
            'created_at' => now(),
        ]);

        $token = $user->createToken('bitchest')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            "firstname" => "required",
            "lastname" => "required",
            "phone" => "required",
            "address" => "required",
            "email" => "required",
            'password' => 'min:8|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:8',
            "elevation" => "required",
        ]);

        $user = User::find($id);
        
        $user->update($request->all());
        $user->password = bcrypt($user->password);
        $user->save();

        return response([
            'user' => $user,
            'message' => 'Utilisateur mis à jour'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        $user->transactions()->delete();

        $user->delete();

        return response([
            'message' => 'Utilisateur supprimé avec succès'
        ], 200);
    }
}
