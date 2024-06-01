<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Models\Service;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function list(Request $request)
    {
        $service = Service::orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
            if (isset($request->inputFilter)) {
                $query->where($request->filter, 'LIKE', "%$request->inputFilter%");
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
}
