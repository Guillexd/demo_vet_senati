<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBreedRequest;
use App\Models\Breed;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class BreedController extends Controller
{
    public function list(Request $request)
    {
        $breed = Breed::orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
            if (isset($request->startDate)) {
                $query->whereDate('created_at', '>=', $request->startDate);
            }
            if (isset($request->finishDate) && empty($request->startDate)) {
                $query->whereDate('created_at', '<=', $request->finishDate);
            }
            if (isset($request->finishDate) && isset($request->startDate)) {
                $query->whereBetween('created_at', [$request->startDate, $request->finishDate]);
            }
            if (isset($request->inputFilter)) {
                $query->where($request->filter, 'LIKE', "%$request->inputFilter%");
            }
        })->paginate($request->limit ?? 20);
        return response()->json($breed);
    }

    public function store(StoreBreedRequest $request)
    {
        Breed::create($request->validated());
        return response()->json($request->only('name'));
    }

    public function update(StoreBreedRequest $request)
    {
        $breed = Breed::whereId($request->id)->update($request->validated());
        return response()->json($breed);
    }

    public function destroy(Request $request)
    {
        $breed = Breed::destroy($request->id);
        return response()->json($breed);
    }
}
