<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function Login(LoginRequest $request){
        $inputsValidate = $request->validated();

        if(!Auth::attempt($inputsValidate)){
            return response()->json([
                'message' => 'votre information est incorrecte !'
            ], 401);
        }
            $user = User::where('email' , $inputsValidate['email'])->firstOrFail();
            $user->tokens()->delete();
            $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
        
    }
    public function Logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully!'
        ], 200);
    }
}
