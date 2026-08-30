<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\LeaveTypeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login' , [AuthController::class , 'Login']);


Route::middleware(['auth:sanctum', 'role:Admin RH'])->group(function () {
    // Route::post('/leave-types', [LeaveTypeController::class, 'store']);
    // Route::get('/export-paie', [LeaveRequestController::class, 'exportPaie']);
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});


Route::middleware(['auth:sanctum', 'role:Manager'])->group(function () {
    // Route::post('/leave-requests/{id}/validate-n1', [LeaveRequestController::class, 'validateN1']);
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});


Route::middleware(['auth:sanctum', 'role:Formateur'])->group(function () {
    // Route::post('/leave-requests/submit', [LeaveRequestController::class, 'store']);
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});


Route::middleware(['auth:sanctum', 'role:Admin RH|Manager'])->group(function () {
    // Route::get('/team-calendar', [LeaveRequestController::class, 'teamCalendar']);
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});