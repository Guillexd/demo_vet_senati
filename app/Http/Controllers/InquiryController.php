<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\RUCService;
use App\Services\DNIService;

class InquiryController extends Controller
{
    protected $rucService;
    protected $dniService;

    public function __construct(RUCService $rucService, DNIService $dniService)
    {
        $this->rucService = $rucService;
        $this->dniService = $dniService;
    }

    public function getRUC(Request $request)
    {
        $response = $this->rucService->getInformation($request->ruc);
        return response()->json($response);
    }

    public function getDNI(Request $request)
    {
        $response = $this->dniService->getInformation($request->dni);
        return response()->json($response);
    }
}
// ruc: 20609278235
// dni: 72854871
