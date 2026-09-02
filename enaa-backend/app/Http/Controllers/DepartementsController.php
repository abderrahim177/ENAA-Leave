<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartementsRequest;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartementsController extends Controller
{
    public function store(DepartementsRequest $request)
    {
        $validateInputs = $request->validated();

        $department = Department::create([
            'name' => $validateInputs['name']
        ]);

        return response()->json([
            'message' => 'Département créé avec succès',
            'department' => $department
        ], 201);
    }
    public function index(Request $request){
        $departements = Department::all();
        return response()->json($departements , 200);
    }
    
}
