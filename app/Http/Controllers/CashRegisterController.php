<?php

namespace App\Http\Controllers;

use App\Exports\CashRegisterExport;
use App\Exports\MovementsExport;
use App\Helpers\Mutator;
use App\Http\Requests\StoreInitialCashRegisterRequest;
use App\Http\Requests\StoreMovementsRequest;
use App\Models\CashRegister;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sales;
use App\Models\Service;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;

class CashRegisterController extends Controller
{
    public function list(Request $request)
    {
        $cash_register = CashRegister::orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
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
        })->paginate($request->limit ?? 20);
        return response()->json($cash_register);
    }
    public function getProducts(Request $request, CashRegister $cashRegister)
    {
        $products = $cashRegister->products()->where(function (Builder $query) use ($request) {
            if (isset($request->inputFilter)) {
                $query->where('name', 'LIKE', "%$request->inputFilter%");
            }
        })
            ->paginate($request->limit ?? 10);

        $products->getCollection()
            ->each(function ($product) {
                $customer = Customer::with(['identity_document' => function ($queryBuilder) {
                    $queryBuilder->select('id', 'abbreviation');
                }])->find($product->pivot->customer_id);
                $product->customer = $customer;
            });

        return response()->json($products);
    }

    public function getServices(Request $request, CashRegister $cashRegister)
    {
        $services = $cashRegister->services()->where(function (Builder $query) use ($request) {
            if (isset($request->inputFilter)) {
                $query->where('name', 'LIKE', "%$request->inputFilter%");
            }
        })->paginate($request->limit ?? 10);

        $services->getCollection()
            ->each(function ($service) {
                $customer = Customer::with(['identity_document' => function ($queryBuilder) {
                    $queryBuilder->select('id', 'abbreviation');
                }])->find($service->pivot->customer_id);
                $service->customer = $customer;
            });

        return response()->json($services);
    }

    public function getExpenses(Request $request, CashRegister $cashRegister)
    {
        $expenses = $cashRegister->expenses()->where(function (Builder $query) use ($request) {
            if (isset($request->inputFilter)) {
                $query->where('reason', 'LIKE', "%$request->inputFilter%");
            }
        })->paginate($request->limit ?? 10);

        return response()->json($expenses);
    }

    public function getAllVouchers(Request $request)
    {
        $query = DB::table('cash_registerables')
            ->select(
                'voucher_id',
                DB::raw('MAX(cash_register_id) AS cash_id'),
                DB::raw('MAX(cash_registerables.created_at) AS max_created_at'),
                DB::raw('(SELECT name FROM customers WHERE id = MAX(customer_id)) AS customer'),
                DB::raw('(SELECT document_number FROM customers WHERE id = MAX(customer_id)) AS doc_customer'),
                DB::raw('(SELECT abbreviation FROM identity_documents JOIN customers ON identity_documents.id = customers.identity_document_id WHERE customers.id = MAX(customer_id)) AS abbreviation')
            )
            ->leftJoin('customers', 'cash_registerables.customer_id', '=', 'customers.id')
            ->orderByDesc('max_created_at')
            ->groupBy(['voucher_id', 'customer_id'])
            ->whereNotNull('voucher_id');

        if (isset($request->inputFilter)) {
            $query->where('voucher_id', 'LIKE', "%$request->inputFilter%")
                ->orWhere('customers.name', 'LIKE', "%$request->inputFilter%")
                ->orWhere('customers.document_number', 'LIKE', "%$request->inputFilter%");
        }

        return response()->json($query->paginate($request->limit ?? 10));
    }

    public function getVoucher(Request $request, CashRegister $cashRegister)
    {
        $v1 = $cashRegister->products()->wherePivot('voucher_id', $request->inputFilter)->get();
        $v2 = $cashRegister->services()->wherePivot('voucher_id', $request->inputFilter)->get();
        $id = $v1->first()?->pivot?->customer_id ?? $v2->first()?->pivot?->customer_id;
        $customer = Customer::with(['identity_document' => function ($queryBuilder) {
            $queryBuilder->select('id', 'abbreviation');
        }])->find($id);
        $voucher = $v1->concat($v2);
        return response()->json([
            'customer' => $customer,
            'voucher' => $voucher
        ]);
    }

    public function storeInitialCashRegister(StoreInitialCashRegisterRequest $request)
    {
        CashRegister::create([
            'initial_amount' => $request->initial_amount,
        ]);
        return response()->json($request->only('initial_amount'));
    }

    public function storeMovements(StoreMovementsRequest $request)
    {
        try {
            DB::beginTransaction();
            if ($request->has('products') || $request->has('services')) {
                $sale = Sales::firstOrFail();
                $uuid = $sale->code . '-' . Str::padLeft($sale->correlativo, 7, '0');
                $seller = auth()->id();
            }
            if ($request->has('products')) {
                $cah_register = CashRegister::findOrFail($request->cash_register_id);

                foreach ($request->input('products') as $product) {
                    $productData = Product::findOrFail($product['product_id']);
                    $stock = $productData->stock;
                    $productData->stock = $productData->stock - $product['quantity'];

                    if ($productData->stock < 0) {
                        throw new \Exception("El stock de $productData->name es insuficiente ($stock).");
                    }

                    if (!$productData->isActive) {
                        throw new \Exception("El producto $productData->name está inactivo, actívelo si desea realizar un movimiento.");
                    }

                    $productData->save();

                    $subTotal = $productData->price * $product['quantity'];

                    $cah_register->products()->attach($productData->id, [
                        'customer_id' => $request->customer_id,
                        'user_id' => $seller,
                        'transactions_type' => 1,
                        'quantity' => $product['quantity'],
                        'voucher_id' => $uuid,
                        'subtotal' => str_replace(',', '', number_format($subTotal, 2)),
                        'description' => $product['description'],
                        'created_at' => now(), 'updated_at' => now()
                    ]);
                }
            }
            if ($request->has('services')) {
                $cah_register = CashRegister::findOrFail($request->cash_register_id);

                foreach ($request->input('services') as $service) {
                    $serviceData = Service::findOrFail($service['service_id']);

                    $subTotal = $serviceData->price * $service['quantity'];

                    if (!$serviceData->isActive) {
                        throw new \Exception("El servicio $serviceData->name está inactivo, actívelo si desea realizar un movimiento.");
                    }

                    $cah_register->services()->attach($serviceData->id, [
                        'customer_id' => $request->customer_id,
                        'user_id' => $seller,
                        'transactions_type' => 1,
                        'quantity' => $service['quantity'],
                        'voucher_id' => $uuid,
                        'subtotal' => str_replace(',', '', number_format($subTotal, 2)),
                        'description' => $service['description'],
                        'created_at' => now(), 'updated_at' => now()
                    ]);
                }
            }
            if ($request->has('expenses')) {
                $cah_register = CashRegister::findOrFail($request->cash_register_id);

                foreach ($request->input('expenses') as $expense) {
                    $cah_register->expenses()->attach($expense['expense_id'], [
                        'transactions_type' => 2,
                        'subtotal' => str_replace(',', '', number_format($expense['subtotal'], 2)),
                        'created_at' => now(), 'updated_at' => now()
                    ]);
                }
            }

            // Aumentamos el correlativo
            if (isset($uuid)) {
                $sale->correlativo = $sale->correlativo + 1;
                $sale->save();
            }

            // Confirmar la transacción
            DB::commit();
        } catch (\Exception $e) {
            // Revertir la transacción en caso de error
            DB::rollback();
            $errors = [
                'movement_error' => [$e->getMessage()],
            ];
            return response()->json(['errors' => $errors], 500);
        }
        return response()->json(['message' => 'Success.'], 201);
    }

    public function update(StoreInitialCashRegisterRequest $request)
    {
        $cash_register = CashRegister::whereId($request->id)->update([
            'initial_amount' => $request->initial_amount,
            'state' => 1,
        ]);
        return response()->json($cash_register);
    }

    public function updateState(Request $request)
    {
        $cash_registerables = DB::table('cash_registerables')
            ->selectRaw('SUM(CASE WHEN transactions_type = 1 THEN subtotal ELSE 0 END) AS total_type_1,
            SUM(CASE WHEN transactions_type = 2 THEN subtotal ELSE 0 END) AS total_type_2')
            ->where('cash_register_id', $request->id)
            ->first();

        $cash_register = CashRegister::findOrFail($request->id);
        $cash_register->total = $cash_registerables->total_type_1 - $cash_registerables->total_type_2;
        $cash_register->state = 0;
        $cash_register->save();
        return response()->json($cash_register->total);
    }

    public function destroy(Request $request)
    {
        $cash_register = CashRegister::destroy($request->id);
        return response()->json($cash_register);
    }

    public function destroyMovement(Request $request)
    {
        $movement = DB::table('cash_registerables')->whereId($request->id)->first();
        if ($movement->cash_registerable_type == "App\Models\Product") {
            $product = Product::findOrFail($movement->cash_registerable_id);
            $product->stock = $product->stock + $movement->quantity;
            $product->save();
        }
        DB::table('cash_registerables')
            ->whereId($request->id)
            ->delete();
        return response()->json($request->all());
    }

    public function destroyVoucher(Request $request)
    {
        $voucher = DB::table('cash_registerables')->where('voucher_id', $request->voucher_id)->get();
        foreach ($voucher as $movement) {
            if ($movement->cash_registerable_type == "App\Models\Product") {
                $product = Product::findOrFail($movement->cash_registerable_id);
                $product->stock = $product->stock + $movement->quantity;
                $product->save();
            }
            DB::table('cash_registerables')
                ->whereId($movement->id)
                ->delete();
        }

        return response()->json($request->all());
    }

    public function getVoucherId()
    {
        $sale = Sales::firstOrFail();
        $voucher = $sale->code . '-' . Str::padLeft($sale->correlativo, 7, '0');
        return response()->json($voucher);
    }

    public function pdfVoucher(Request $request, CashRegister $cashRegister)
    {
        $data = $cashRegister->products()->wherePivot('voucher_id', $request->uuid)->first() ?? $cashRegister->services()->wherePivot('voucher_id', $request->uuid)->first();
        $id = $data?->pivot?->customer_id;
        $seller = User::find($data?->pivot?->user_id);
        $timestamp = strtotime($data?->pivot?->created_at);
        $date = date('d/m/Y H:i:s', $timestamp);

        $customer = Customer::with(['identity_document' => function ($queryBuilder) {
            $queryBuilder->select('id', 'abbreviation');
        }])->find($id);
        $products = $cashRegister->products()->wherePivot('voucher_id', $request->uuid)->get();
        $products
            ->each(function ($product) {
                $code = 'P' . Str::padLeft($product->id, 7, '0');
                $product->code = $code;
            });
        $services = $cashRegister->services()->wherePivot('voucher_id', $request->uuid)->get();
        $services
            ->each(function ($service) {
                $code = 'S' . Str::padLeft($service->id, 7, '0');
                $service->code = $code;
            });
        $ps = $products->concat($services);
        $total = round($ps->sum('pivot.subtotal'), 2);

        $voucher = [
            'voucher_name' => "Ticket de venta",
            'code' => $request->uuid,
            'date' => $date,
            'customer' => $customer,
            'products_services' => $ps,
            'legend' => Mutator::toLegend($total),
            'seller' => $seller,
            'total' => $total,
        ];

        $pdf = PDF::loadView('App.Pdf.pdf_voucher', $voucher);
        return $pdf->stream('voucher-' . $request->uuid . '.pdf');
    }

    public function excelProducts(Request $request)
    {
        return Excel::download(new CashRegisterExport($request->id), 'caja-' . $request->id . '.xlsx');
    }

    public function excelByMonth(Request $request)
    {
        return Excel::download(new MovementsExport($request->year, $request->month), 'datos-' . $request->month . '-' . $request->year . '.xlsx');
    }
}
