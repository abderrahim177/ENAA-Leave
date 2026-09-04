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
    public function index(Request $request)
{
    $departements = Department::with(['users' => function($query) {
        $query->select('id', 'name', 'email', 'role', 'department_id');
    }])->withCount('users')->get();

    return response()->json($departements, 200);
}

}
