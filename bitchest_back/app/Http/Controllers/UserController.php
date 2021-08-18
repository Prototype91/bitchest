<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        // We check the login form
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // We check the user's email
        $user = User::where('email', $fields['email'])->first();

        $password = Hash::check($fields['password'], $user->password);

        $token = $user->createToken('bitchesttoken')->plainTextToken;

        // We set the success response
        $successResponse = [
            'user' => $user,
            'token' => $token
        ];

        // We set the error response
        $errorResponse = response([
            'message' => 'email ou mot de passe incorrect'
        ], 403);

        return !$user || !$password ? $errorResponse : $successResponse;
    }
}
