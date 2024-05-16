<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject(Lang::get('dictionary.verify_email'))
                ->line(Lang::get('dictionary.verify_greeting'))
                ->view('App.email-verify-view', compact('url'));
        });

        ResetPassword::toMailUsing(function (object $notifiable, string $token) {
            $url = URL::temporarySignedRoute(
                'password.reset',
                Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
                ['token' => $token]
            );

            $url .= '&email=' . urlencode($notifiable->getEmailForPasswordReset());
            return (new MailMessage)
                ->subject(Lang::get('dictionary.reset_password'))
                ->line(Lang::get('dictionary.verify_greeting'))
                ->view('Guest.password-reset-view', compact('url'));
        });

        Gate::define('admin', function (User $user) {
            return $user->rol_id === 1
                    ? Response::allow()
                    : Response::deny('Debes de ser un administrador.');
        });
    }
}
