<?php

namespace App\Http\Middleware;

use App\Models\CashRegister;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCashRegisterIsOpen
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $id = $request->cash_register_id ?? $request->id;
        $cash_register = CashRegister::findOrFail($id);
        // dd($cash_register->state);
        if($cash_register->state === 0) {
            $errors = [
                'request_error' => ['La caja debe estar abierta para realizar esta acción.'],
            ];
            return response()->json(['errors' => $errors], 404);
        }
        return $next($request);
    }
}
