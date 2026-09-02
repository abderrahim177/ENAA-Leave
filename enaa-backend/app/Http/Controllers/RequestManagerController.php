<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class RequestManagerController extends Controller
{
    public function getAllRequestsForAdmin()
    {
        $requests = LeaveRequest::with(['leaveType', 'user'])->get();
        return response()->json($requests, 200);
    }
}
