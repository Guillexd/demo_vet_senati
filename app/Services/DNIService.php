<?php

namespace App\Services;

use GuzzleHttp\Client;
class DNIService
{
    public function __construct(protected Client $client)
    {
    }

    public function getInformation($dni)
    {
        $res = $this->client->request('GET', '/v2/reniec/dni', [
            'query' => ['numero' => $dni],
            'headers' => [
                'Authorization' => 'Bearer ' . env('TOKEN_APIS_NET'),
                'Referer' => 'https://apis.net.pe/api-consulta-dni',
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
