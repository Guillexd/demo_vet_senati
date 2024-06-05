@extends('App.layout')
@section('title', 'Productos')
@section('content')
    <div id="product" class="relative" role={{auth()->user()->rol_id}}>
        @include('App.loader')
    </div>
@endsection
