@extends('App.layout')
@section('title', 'Caja')
@section('content')
    <div id="cash_register" class="relative" role={{auth()->user()->rol_id}}>
        @include('App.loader')
    </div>
@endsection
