<?php

namespace App\Http\Middleware;

use App\Models\CashRegister;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureJustOneCashRegisterIsOpen
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $cash_register = CashRegister::where('state', true)->exists();

        if($cash_register) {
            $errors = [
                'request_error' => ["Ya existe una caja registradora abierta."],
            ];
            return response()->json(['errors' => $errors], 404);
        }
        return $next($request);
    }
}
