<?php

namespace App\Services;

use GuzzleHttp\Client;
class RUCService
{
    public function __construct(protected Client $client)
    {
    }

    public function getInformation($ruc)
    {
        $res = $this->client->request('GET', '/v2/sunat/ruc', [
            'query' => ['numero' => $ruc],
            'headers' => [
                'Authorization' => 'Bearer ' . env('TOKEN_APIS_NET'),
                'Referer' => 'https://apis.net.pe/api-consulta-ruc',
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ],
            'http_errors' => false,
            'connect_timeout' => 5,
        ]);

        $response = json_decode($res->getBody()->getContents(), true);
        return response()->json($response);
    }
}

