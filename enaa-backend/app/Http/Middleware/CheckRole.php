<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
   public function handle(Request $request, Closure $next, ...$roles): Response
{
    if (! $request->user()) {
        return response()->json([
            'debug_error' => 'User Token non trouvé ou invalide (Unauthenticated)'
        ], 403);
    }

    if (! in_array($request->user()->role, $roles)) {
        return response()->json([
            'debug_error' => 'Role mismatch',
            'user_role_in_db' => $request->user()->role,
            'expected_roles' => $roles                   
        ], 403);
    }

    return $next($request);
}
}