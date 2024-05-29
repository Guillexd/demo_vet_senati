<?php

namespace App\Providers;

use App\Services\DNIService;
use App\Services\RUCService;
use GuzzleHttp\Client;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->when([DNIService::class, RUCService::class])
            ->needs(Client::class)
            ->give(function ($app) {
                return new Client(['base_uri' => 'https://api.apis.net.pe', 'verify' => false]);
            });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
