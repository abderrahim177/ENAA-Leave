<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use App\Http\Requests\GestionCongésAdminRequest;
use Illuminate\Http\Request;

class GestionCongésAdminController extends Controller
{
    public function index(Request $request)
    {
        $Conges = LeaveRequest::with('user')->where('status', 'pending_manager')->get();
        return response()->json($Conges, 200);
    }

    public function Update(GestionCongésAdminRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $leaveRequest = LeaveRequest::find($id);

            if (!$leaveRequest) {
                return response()->json([
                    'message' => 'Demande non trouvée.'
                ], 404);
            }

            $leaveRequest->status = $validated['status'];

            if (array_key_exists('rejection_reason', $validated)) {
                $leaveRequest->rejection_reason = $validated['rejection_reason'];
            }

            $leaveRequest->save();

            return response()->json([
                'message' => 'Demande refusée et mise à jour avec succès.',
                'data'    => $leaveRequest
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
