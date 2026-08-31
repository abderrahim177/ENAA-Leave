<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LeaveRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       return [
        'type_conge'     => 'required|string',
        'date_debut'     => 'required|date',
        'date_fin'       => 'required|date|after_or_equal:date_debut',
        'commentaire'    => 'nullable|string', 
        'justificative'  => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048', 
    ];
    }
}
