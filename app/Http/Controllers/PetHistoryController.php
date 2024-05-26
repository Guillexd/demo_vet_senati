<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePetHistoryRequest;
use App\Models\PetHistory;
use App\Services\UploadImageService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class PetHistoryController extends Controller
{
    public function __construct(private UploadImageService $uploadImageService)
    {
    }
    private function getImageTypes(): array
    {
        return [
            (object) [
                'value' => 'hemograma',
                'image' => 'hemograma_image_url',
                'key' => 'hemograma_public_id',
            ],
            (object) [
                'value' => 'ecografia',
                'image' => 'ecografia_image_url',
                'key' => 'ecografia_public_id',
            ],
            (object) [
                'value' => 'radiografias',
                'image' => 'radiografias_image_url',
                'key' => 'radiografias_public_id',
            ],
        ];
    }
    public function list(Request $request)
    {
        $pet_history = PetHistory::with('pet.customer.identity_document', 'pet.breed')->orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
            if ($request->filter === 'pet_id') {
                $query->whereHas('pet', function (Builder $subQuery) use ($request) {
                    $subQuery->where('name', 'LIKE', "%{$request->inputFilter}%");
                });
            }
            if ($request->filter === 'customer_id') {
                $query->whereHas('pet.customer', function (Builder $subQuery) use ($request) {
                    $subQuery->where('name', 'LIKE', "%{$request->inputFilter}%");
                });
            }
            if ($request->filter === 'document_number') {
                $query->whereHas('pet.customer', function (Builder $subQuery) use ($request) {
                    $subQuery->where('document_number', 'LIKE', "%{$request->inputFilter}%");
                });
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
            if (isset($request->startNextDate)) {
                $query->whereDate('next_date', '>=', $request->startNextDate);
            }
            if (isset($request->finishNextDate) && empty($request->startNextDate)) {
                $query->whereDate('next_date', '<=', $request->finishNextDate);
            }
            if (isset($request->finishNextDate) && isset($request->startNextDate)) {
                $finishNextDate = date('Y-m-d', strtotime($request->finishNextDate . ' +1 day'));
                $query->whereBetween('next_date', [$request->startNextDate, $finishNextDate]);
            }
            if (isset($request->inputFilter) && $request->filter !== 'pet_id' && $request->filter !== 'customer_id' && $request->filter !== 'document_number' && $request->filter !== 'next_date') {
                $query->where($request->filter, 'LIKE', "%$request->inputFilter%");
            }
        })->paginate($request->limit ?? 20);
        return response()->json($pet_history);
    }

    public function store(StorePetHistoryRequest $request)
    {
        $imageUrls = [];

        foreach ($this->getImageTypes() as $type) {
            if ($request->hasFile($type->image) && $request->input($type->value) == 1) {
                $img_info = $this->uploadImageService->saveImage($request->file($type->image)->getRealPath());
                $imageUrls[$type->image] = (object) array_merge([
                    'public_id_key' => $type->key
                ], (array) $img_info);
                // $val = (object) [
                //     'image_url' => 'Es un link publico p :v' . rand(0, 100),
                //     'public_id' => 'Es un id publico p :,,,v' . rand(0, 100),
                // ];
                // $imageUrls[$type->image] = (object) array_merge([
                //     'public_id_key' => $type->key
                // ], (array) $val);
            }
        }

        $validatedArray = $request->validated();

        $data = [];

        foreach ($validatedArray as $key => $value) {
            if (array_key_exists($key, $imageUrls)) {
                $data[$key] = $imageUrls[$key]?->image_url;
                $data[$imageUrls[$key]?->public_id_key] = $imageUrls[$key]?->public_id;
                continue;
            }
            $data[$key] = $value;
        }

        $pet_history = PetHistory::create($data);
        return response()->json($pet_history);
    }

    public function update(StorePetHistoryRequest $request)
    {
        $imageUrls = [];

        foreach ($this->getImageTypes() as $type) {
            if ($request->hasFile($type->image) && $request->input($type->value) == 1) {
                $img_info = $this->uploadImageService->saveImage($request->file($type->image)->getRealPath());
                $imageUrls[$type->image] = (object) array_merge([
                    'public_id_key' => $type->key
                ], (array) $img_info);
            }
        }

        $validatedArray = $request->validated();

        $data = [];

        foreach ($validatedArray as $key => $value) {
            if (array_key_exists($key, $imageUrls)) {
                $data[$key] = $imageUrls[$key]?->image_url;
                $data[$imageUrls[$key]?->public_id_key] = $imageUrls[$key]?->public_id;
                continue;
            }
            $data[$key] = $value;
        }

        PetHistory::whereId($request->id)->update($data);
        return response()->json(['id' => $request->id]);
    }

    public function destroy(Request $request)
    {
        $pet_history = PetHistory::destroy($request->id);
        return response()->json($pet_history);
    }

    public function getNextDate(Request $request)
    {
        $firstDay = now()->format('Y-m-d');
        $lastDay = now()->addDays(14);
        $pet_histories = PetHistory::with('pet.customer')->orderBy('id', 'desc')->whereBetween('next_date', [$firstDay, $lastDay])->get();
        $count = $pet_histories->count();
        return response()->json(['histories' => $pet_histories, 'count' => $count]);
    }

    public function getPlanPdf(Request $request)
    {
        $pet_history = PetHistory::with('pet.customer')->find($request->id);
        $pdf = PDF::loadView('App.Pdf.pdf_plan', ['pet_history' => $pet_history]);
        return $pdf->stream('plan-' . $request->id . '.pdf');
    }
}
