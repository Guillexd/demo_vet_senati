@extends('App.layout')
@section('title', 'Servicios')
@section('content')
    <div id="service" class="relative" role={{auth()->user()->rol_id}}>
        @include('App.loader')
    </div>
@endsection
