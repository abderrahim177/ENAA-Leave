<?php

namespace App\Http\Controllers;

use App\Models\LeaveType;
use Illuminate\Http\Request;

class GetlAllTypeLeaveController extends Controller
{
    public function index(){
        $LeaveType = LeaveType::all();
        return response()->json($LeaveType , 200);
    }
}
