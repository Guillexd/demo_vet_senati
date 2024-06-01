<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenseRequest;
use App\Models\Expense;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function list(Request $request)
    {
        $expense = Expense::orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
            if (isset($request->inputFilter)) {
                $query->where($request->filter, 'LIKE', "%$request->inputFilter%");
            }
        })->paginate($request->limit ?? 20);
        return response()->json($expense);
    }

    public function store(StoreExpenseRequest $request)
    {
        Expense::create($request->validated());
        return response()->json($request->only('name'));
    }

    public function update(StoreExpenseRequest $request)
    {
        $expense = Expense::whereId($request->id)->update($request->validated());
        return response()->json($expense);
    }

    public function destroy(Request $request)
    {
        $expense = Expense::destroy($request->id);
        return response()->json($expense);
    }
}
