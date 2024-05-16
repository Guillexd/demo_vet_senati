<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use App\Services\UploadImageService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $uploadImageService;
    public function __construct(UploadImageService $uploadImageService)
    {
        $this->uploadImageService = $uploadImageService;
    }
    public function list(Request $request)
    {
        $product = Product::orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
            if (isset($request->dueDate)) {
                $query->whereDate('due_date', '<=', $request->dueDate);
            }
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
        return response()->json($product);
    }

    public function store(StoreProductRequest $request)
    {
        if ($request->hasFile('product_image')) {
            $img_info = $this->uploadImageService->saveImage($request->file('product_image')->getRealPath());
            Product::create([
                'name' => $request->name,
                'price' => $request->price,
                'purchase_price' => $request->purchase_price,
                'stock' => $request->stock,
                'utility' => $request->utility,
                'serie' => $request->serie,
                'product_image_url' => $img_info->image_url,
                'product_public_id' => $img_info->public_id,
                'description' => $request->description,
                'due_date' => $request->due_date,
            ]);
        } else {
            Product::create($request->validated());
        }
        return response()->json($request->only('name'));
    }

    public function update(StoreProductRequest $request)
    {
        $product = Product::findOrFail($request->id);
        $product->name = $request->name;
        $product->price = $request->price;
        $product->purchase_price = $request->purchase_price;
        $product->stock = $request->stock;
        $product->utility = $request->utility;
        $product->serie = $request->serie;
        $product->description = $request->description;
        $product->due_date = $request->due_date;

        if ($request->hasFile('product_image')) {
            $img_info = $this->uploadImageService->saveImage($request->file('product_image')->getRealPath(), $product->product_public_id);
            $product->product_image_url = $img_info->image_url;
            $product->product_public_id = $img_info->public_id;
        }

        $product->save();
        return response()->json($product);
    }

    public function destroy(Request $request)
    {
        $product = Product::findOrFail($request->id);
        if ($product->product_public_id !== null) {
            $this->uploadImageService->destroyImage($product->product_public_id);
        }
        $product->delete();
        return response()->json($product);
    }

    public function getProductsByDueDate(Request $request)
    {
        $firstDay = now()->format('Y-m-d');
        $lastDay = now()->addDays(30);
        $products = Product::orderBy('id', 'desc')->whereBetween('due_date', [$firstDay, $lastDay])->get();
        $count = $products->count();
        return response()->json(['products' => $products, 'count' => $count]);
    }
}
