<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8'
        ]);

        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->api_token = Str::random(80);
        $user->save();

        return $user->only('id', 'name', 'api_token');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json(Auth::user()->only('id', 'name', 'api_token'), 200);
        } else {
            return response()->json([
                'message' => 'Incorrect or not existing email/password combination',
                'errors' => ['login' => ['Incorrect or not existing email/password combination']]
            ], 403);
        }
    }
}
