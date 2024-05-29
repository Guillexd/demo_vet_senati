<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePetRequest;
use App\Models\Pet;
use App\Services\UploadImageService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class PetController extends Controller
{
    private $uploadImageService;
    public function __construct(UploadImageService $uploadImageService)
    {
        $this->uploadImageService = $uploadImageService;
    }
    public function list(Request $request)
    {
        $pet = Pet::with('customer.identity_document', 'breed')->orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
            if ($request->filter === 'customer_id') {
                $query->whereHas('customer', function (Builder $subQuery) use ($request) {
                    $subQuery->where('name', 'LIKE', "%{$request->inputFilter}%");
                });
            }
            if ($request->filter === 'document_number') {
                $query->whereHas('customer', function (Builder $subQuery) use ($request) {
                    $subQuery->where('document_number', 'LIKE', "%{$request->inputFilter}%");
                });
            }
            if ($request->filter === 'breed_id') {
                $query->whereHas('breed', function (Builder $subQuery) use ($request) {
                    $subQuery->where('name', 'LIKE', "%{$request->inputFilter}%");
                });
            }
            if (isset($request->sex)) {
                $query->where('sex', $request->sex);
            }
            if (isset($request->startDate)) {
                $query->whereDate('created_at', '>=', $request->startDate);
            }
            if (isset($request->finishDate) && empty($request->startDate)) {
                $query->whereDate('created_at', '<=', $request->finishDate);
            }
            if (isset($request->finishDate) && isset($request->startDate)) {
                $finishDate = date('Y-m-d', strtotime($request->finishDate . ' +1 day'));
                $query->whereBetween('created_at', [$request->startDate, $finishDate]);
            }
            if (isset($request->inputFilter) && $request->filter !== 'customer_id' && $request->filter !== 'breed_id' && $request->filter !== 'document_number') {
                $query->where($request->filter, 'LIKE', "%$request->inputFilter%");
            }
        })->paginate($request->limit ?? 20);
        return response()->json($pet);
    }

    public function store(StorePetRequest $request)
    {
        if ($request->hasFile('pet_image')) {
            $img_info = $this->uploadImageService->saveImage($request->file('pet_image')->getRealPath());
            Pet::create([
                'name' => $request->name,
                'age' => $request->age,
                'customer_id' => $request->customer_id,
                'breed_id' => $request->breed_id,
                'sex' => $request->sex,
                'ce' => $request->ce,
                'pet_image_url' => $img_info->image_url,
                'pet_public_id' => $img_info->public_id,
                'observations' => $request->observations,
            ]);
        } else {
            Pet::create($request->validated());
        }
        return response()->json($request->only('name'));
    }

    public function update(StorePetRequest $request)
    {
        $pet = Pet::findOrFail($request->id);
        $pet->name = $request->name;
        $pet->age = $request->age;
        $pet->customer_id = $request->customer_id;
        $pet->breed_id = $request->breed_id;
        $pet->sex = $request->sex;
        $pet->ce = $request->ce;
        $pet->observations = $request->observations;

        if ($request->hasFile('pet_image')) {
            $img_info = $this->uploadImageService->saveImage($request->file('pet_image')->getRealPath(), $pet->pet_public_id);
            $pet->pet_image_url = $img_info->image_url;
            $pet->pet_public_id = $img_info->public_id;
        }

        $pet->save();
        return response()->json($pet);
    }

    public function destroy(Request $request)
    {
        $pet = Pet::findOrFail($request->id);
        if ($pet->pet_public_id !== null) {
            $this->uploadImageService->destroyImage($pet->pet_public_id);
        }
        $pet->delete();
        return response()->json($pet);
    }
}
