<?php

namespace App\Http\Controllers;

use App\Models\IdentityDocument;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class IdentityDocumentController extends Controller
{
    public function list(Request $request)
    {
        $identity_doc = IdentityDocument::where(function (Builder $query) use ($request) {
            if (isset($request->inputFilter)) {
                $query->where($request->filter, 'LIKE', "%$request->inputFilter%");
            }
        })->get();
        return response()->json($identity_doc);
    }
}
