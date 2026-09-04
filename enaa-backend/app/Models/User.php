<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_formateur',
        'department_id',
        'manager_id'
    ];

    protected $hidden = ['password', 'remember_token'];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
    public function formateurs(): HasMany
    {
        return $this->hasMany(User::class, 'manager_id')->where('role', 'formateur');
    }
    
    public function subordinates(): HasMany
    {
        return $this->hasMany(User::class, 'manager_id');
    }

    public function leaveBalances(): HasMany
    {
        return $this->hasMany(LeaveBalance::class);
    }

    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function isAdminRh(): bool
    {
        return $this->role === 'admin_rh';
    }

    public function isManager(): bool
    {
        return $this->role === 'manager';
    }

    public function isFormateur(): bool
    {
        return $this->role === 'formateur' || $this->is_formateur;
    }
}
