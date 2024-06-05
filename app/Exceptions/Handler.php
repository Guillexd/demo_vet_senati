<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Support\Facades\Lang;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {

    }
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ThrottleRequestsException) {
            if($request->expectsJson()) {
                return response()->json([
                    'message' => 'Demasiados intentos, vuelva a intentarlo en ' . $exception->getHeaders()['Retry-After'] . ' segundos.',
                    'exception' => get_class($exception)
                ], 429);
            }
        }

        return parent::render($request, $exception);
    }
}
