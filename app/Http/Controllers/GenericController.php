<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenericController extends Controller
{
    public function changeStatus(Request $request)
    {
        return DB::table($request->model)->where('id', $request->id)->update(['isActive' => $request->isActive]);
    }
}
