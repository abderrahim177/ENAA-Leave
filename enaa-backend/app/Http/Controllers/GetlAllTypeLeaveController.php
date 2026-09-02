<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use App\Models\LeaveType;
use Illuminate\Http\Request;

class GetlAllTypeLeaveController extends Controller
{
    public function index(){
        $LeaveType = LeaveType::all();
        return response()->json($LeaveType , 200);
    }

    public function GetAllRequest(Request $request){
        $requests = LeaveRequest::with('leaveType')
        ->where('user_id', $request->user()->id)
        ->get();
        return response()->json($requests , 200);
    }

    public function GetLeaveType(Request $request){
        $leaveType = LeaveType::all();
        return response()->json($leaveType , 200);
    }
    
}
