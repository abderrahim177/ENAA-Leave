<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function me(Request $request){
        $User = $request->user();

        if(!$User){
            return response()->json([
                'message' => 'user introvable !'
            ] , 404);
        }
        return response()->json([
            'status' => 'success',
            'user' => $User
        ], 200);
    }
}
