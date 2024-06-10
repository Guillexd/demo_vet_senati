<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function list(Request $request)
    {
        $customer = Customer::with(['identity_document' => function ($queryBuilder) {
            $queryBuilder->select('id', 'description', 'abbreviation');
        }])->orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
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
            if (isset($request->inputFilter)) {
                $query->where($request->filter, 'LIKE', "%$request->inputFilter%");
            }
        })->paginate($request->limit ?? 20);
        return response()->json($customer);
    }

    public function store(StoreCustomerRequest $request)
    {
        Customer::create($request->validated());
        return response()->json($request->only('name'));
    }

    public function update(UpdateCustomerRequest $request)
    {
        $customer = Customer::whereId($request->id)->update($request->validated());
        return response()->json($customer);
    }

    public function destroy(Request $request)
    {
        $customer = Customer::destroy($request->id);
        return response()->json($customer);
    }
}
