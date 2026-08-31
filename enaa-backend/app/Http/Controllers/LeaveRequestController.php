<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveRequestRequest;
use App\Models\LeaveRequest;
use Illuminate\Support\Facades\Auth;

class LeaveRequestController extends Controller
{
    public function store(LeaveRequestRequest $request)
    {
        try {
            $validated = $request->validated();

            $attachmentPath = null;
            if ($request->hasFile('justificative')) {
                $attachmentPath = $request->file('justificative')->store('attachments', 'public');
            }

            $leaveRequest = LeaveRequest::create([
                'user_id'          => Auth::id(),
                'leave_type_id'    => $validated['type_conge'],
                'start_date'        => $validated['date_debut'],
                'end_date'          => $validated['date_fin'],
                'duration_type'    => 'full_day', 
                'reason'           => $validated['commentaire'] ?? null,
                'attachment_path'  => $attachmentPath,
                'status'           => 'pending_manager',
                'rejection_reason' => null, 
            ]);

            return response()->json([
                'message' => 'Demande créée avec succès',
                'data'    => $leaveRequest
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'error_details' => $e->getMessage(),
                'line'          => $e->getLine(),
                'file'          => $e->getFile()
            ], 500);
        }  
    }
}