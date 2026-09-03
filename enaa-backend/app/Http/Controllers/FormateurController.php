<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormateurRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class FormateurController extends Controller
{
    public function index(Request $request) 
{
    $formateurs = User::with('department', 'manager')
        ->where('role', 'formateur')
        ->get();

    return response()->json($formateurs, 200);
}
     public function store(FormateurRequest $request){
        try{
            $validateInputs = $request->validated();

        User::create([
        'name'          => $validateInputs['name'],
        'email'         => $validateInputs['email'],
        'password'      => Hash::make($validateInputs['password']), 
        'role'          => 'formateur',
        'department_id' => $validateInputs['department_id'],
        'manager_id' => $validateInputs['manager_id'],
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'manager Created seccussfuly !',
        ], 201);
        
        }catch (\Exception $e) {
            return response()->json([
                'error_details' => $e->getMessage(),
                'line'          => $e->getLine(),
                'file'          => $e->getFile()
            ], 500);
        }
        
    }
}
