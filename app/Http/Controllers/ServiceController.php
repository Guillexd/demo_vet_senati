<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Imports\ServicesImport;
use App\Models\Service;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ServiceController extends Controller
{
    public function list(Request $request)
    {
        $service = Service::orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
            if (isset($request->inputFilter)) {
                $query->where($request->filter, 'LIKE', "%$request->inputFilter%");
            }
            if(auth()->user()->rol_id !== 1) {
                $query->where('isActive', true);
            }
        })->paginate($request->limit ?? 20);
        return response()->json($service);
    }

    public function store(StoreServiceRequest $request)
    {
        Service::create($request->validated());
        return response()->json($request->only('name'));
    }

    public function update(StoreServiceRequest $request)
    {
        $service = Service::whereId($request->id)->update($request->validated());
        return response()->json($service);
    }

    public function destroy(Request $request)
    {
        $service = Service::destroy($request->id);
        return response()->json($service);
    }

    public function import(Request $request)
    {
        Excel::import(new ServicesImport, $request->file('excel'));
        return response()->json([
            'successfull' => true
        ]);
    }
}
