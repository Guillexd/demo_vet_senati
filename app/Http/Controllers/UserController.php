<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class UserController extends Controller
{
    public function list(Request $request)
    {
        $user = User::with('rol')->orderBy('id', 'desc')->where(function (Builder $query) use ($request) {
            if (isset($request->rol)) {
                $query->where('rol_id', $request->rol);
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
        return response()->json($user);
    }

    public function store(StoreUserRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'rol_id' => $request->rol_id,
            'dni' => $request->dni,
            'phone' => $request->phone,
            'direction' => $request->direction,
            'password' => Hash::make($request->password),
        ]);

        // event(new Registered($user));

        return response()->json($request->only('name'));
    }

    public function update(UpdateUserRequest $request)
    {
        $user = User::whereId($request->id)->update($request->validated());
        return response()->json($user);
    }

    public function destroy(Request $request)
    {
        if($request->id === auth()->user()->id) {
            $errors = [
                'user_error' => ['No es posible eliminar tu cuenta directamente a través del sistema, tienes que realizarlo desde otra cuenta administrativa.'],
            ];
            return response()->json(['errors' => $errors], 400);
        }
        $user = User::destroy($request->id);
        return response()->json($user);
    }
}
