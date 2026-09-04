<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartementsController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\GestionCongésAdminController;
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
    Route::post('/add_formateur' , [FormateurController::class , 'store']);
    Route::get('/Getformateur' , [FormateurController::class , 'index']);
    Route::get('/GetConges' , [GestionCongésAdminController::class , 'index']);
    Route::put('/updateRequestStatusAdmin/{id}', [GestionCongésAdminController::class, 'Update']);
    Route::post('/Logout' , [AuthController::class , 'Logout']);
});


Route::middleware(['auth:sanctum', 'role:manager'])->group(function () {
    Route::put('/updateRequestStatus/{id}', [LeaveRequestController::class, 'Update']);
    Route::get('getAllRequestsForAdmin' , [RequestManagerController::class , 'getAllRequestsForAdmin']);
    Route::get('/MonEquipe' , [ManagerController::class , 'MonEquipe']);
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