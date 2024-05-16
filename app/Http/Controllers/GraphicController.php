<?php

namespace App\Http\Controllers;

use App\Exports\ProductsAndServicesAcquiredExport;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class GraphicController extends Controller
{
    public function list()
    {
        $products = Product::select('price', 'stock')->get();
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        $sales = DB::table('cash_registerables')
            ->select('products.name', DB::raw('SUM(quantity) as repeticiones'))
            ->join('products', 'cash_registerables.cash_registerable_id', '=', 'products.id')
            ->where('cash_registerable_type', '=', 'App\Models\Product')
            ->whereMonth('cash_registerables.created_at', $currentMonth)
            ->whereYear('cash_registerables.created_at', $currentYear)
            ->groupBy('products.name')
            ->orderByDesc('repeticiones')
            ->limit(10)
            ->get();

        $neto = DB::table('cash_registers')
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('CAST(SUM(total) AS DECIMAL(10, 2)) as total')
            )
            ->where('created_at', '>=', now()->subMonths(11))
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%Y-%m")'))
            ->orderBy('month', 'asc')
            ->get();

        $capital = 0;
        foreach ($products as $product) {
            $capital += $product->price * $product->stock;
        }
        $capital = number_format($capital, 2);


        return response()->json([
            'capital' => $capital,
            'sale' => $sales,
            'neto' => $neto,
        ]);
    }
    public function excelProductsByMonth(Request $request)
    {
        return Excel::download(new ProductsAndServicesAcquiredExport($request->year, $request->month), 'productos_servicios_más_vendidos-' . $request->month . '-' . $request->year . '.xlsx');
    }
}
