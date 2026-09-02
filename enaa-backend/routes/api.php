<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartementsController;
use App\Http\Controllers\GetlAllTypeLeaveController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\RequestManagerController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login' , [AuthController::class , 'Login']);


Route::middleware(['auth:sanctum', 'role:admin_rh'])->group(function () {
    // Route::post('/leave-types', [LeaveTypeController::class, 'store']);
    // Route::get('/export-paie', [LeaveRequestController::class, 'exportPaie']);
    Route::post('/departments' , [DepartementsController::class , 'store']);
    Route::get('/Getdepartments' , [DepartementsController::class , 'index']);
    Route::get('/Getmanager' , [ManagerController::class , 'index']);
    Route::post('/add_manager' , [ManagerController::class , 'store']);
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});


Route::middleware(['auth:sanctum', 'role:manager'])->group(function () {
    Route::put('/updateRequestStatus/{id}', [LeaveRequestController::class, 'Update']);
    Route::get('getAllRequestsForAdmin' , [RequestManagerController::class , 'getAllRequestsForAdmin']);
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});


Route::middleware(['auth:sanctum', 'role:formateur'])->group(function () {
    Route::post('/leave-requests/submit', [LeaveRequestController::class, 'store']);
    Route::get('/GetAllleaveType' , [GetlAllTypeLeaveController::class , 'index']);
    Route::get('GetAllRequest' , [GetlAllTypeLeaveController::class , 'GetAllRequest']);
    Route::get('/GetLeaveType' , [GetlAllTypeLeaveController::class , 'GetLeaveType']);
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});


Route::middleware(['auth:sanctum', 'role:Admin RH|Manager'])->group(function () {
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});