<?php

namespace App\Http\Controllers;

use App\Models\User as ModelsUser;
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::create($request->all());

        // // image
        // $im = $request->file('picture');
        
        // // si on associe une image à un product 
        // if (!empty($im)) {
        //     $link = $request->file('picture')->store($category->gender);

        //     // mettre à jour la table picture pour le lien vers l'image dans la base de données
        //     $product->picture()->create([
        //         'link' => $link,
        //     ]);

        //     $product->save();
        // }

        return response([
            'user' => $user,
            'message' => 'Utilisateur ajouté avec succès'
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
        //
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
        //
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

        $user->delete();

        return response([
            'message' => 'Utilisateur supprimé avec succès'
        ], 200);
    }
}
