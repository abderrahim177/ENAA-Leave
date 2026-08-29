<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Replacement extends Model
{
    protected $fillable = [
        'leave_request_id', 'replacement_user_id', 'rattrapage_dates', 'status'
    ];

    protected $casts = [
        'rattrapage_dates' => 'array',
    ];

    public function leaveRequest(): BelongsTo
    {
        return $this->belongsTo(LeaveRequest::class);
    }

    public function substitute(): BelongsTo
    {
        return $this->belongsTo(User::class, 'replacement_user_id');
    }
}