<?php

namespace App\Http\Controllers;

use App\Http\Requests\ManagerRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ManagerController extends Controller
{
    public function index(Request $request){
        $Managers = User::with('department')
        ->where('role' , 'manager')
        ->withCount('formateurs')
        ->get();
        return response()->json($Managers , 200);
    }
    public function store(ManagerRequest $request){
        try{
            $validateInputs = $request->validated();

        User::create([
        'name'          => $validateInputs['name'],
        'email'         => $validateInputs['email'],
        'password'      => Hash::make($validateInputs['password']), 
        'role'          => 'manager',
        'department_id' => $validateInputs['department_id'],
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
    public function MonEquipe(Request $request)
    {
    $managerId = $request->user()->id;
    $equipe = User::where('manager_id', $managerId)
        ->where('role', 'formateur')
        ->get();

    return response()->json($equipe, 200);
    }
}
