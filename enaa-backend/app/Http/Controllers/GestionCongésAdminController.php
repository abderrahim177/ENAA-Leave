<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use App\Http\Requests\GestionCongésAdminRequest; // 1. أضف هذا السطر هنا
use Illuminate\Http\Request;

class GestionCongésAdminController extends Controller
{
    public function index(Request $request){
        $Conges = LeaveRequest::with('user')->where('status' , 'pending_manager')->get();
        return response()->json($Conges , 200);
    }

    // 2. غير نوع $request لـ GestionCongésAdminRequest
    public function Update(GestionCongésAdminRequest $request, $id){ 
        
        try {
            $validated = $request->validated();

            $leaveRequest = LeaveRequest::find($id);

            if (!$leaveRequest) {
                return response()->json([
                    'message' => 'Demande non trouvée.'
                ], 404);
            }

            $leaveRequest->status = $validated['status'];

            if (isset($validated['rejection_reason'])) {
                $leaveRequest->rejection_reason = $validated['rejection_reason'];
            }

            $leaveRequest->save();

            return response()->json([
                'message' => 'Statut de la demande mis à jour avec succès.',
                'data' => $leaveRequest
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error_details' => $e->getMessage(),
                'line'          => $e->getLine(),
                'file'          => $e->getFile()
            ], 500);
        }
    }
}