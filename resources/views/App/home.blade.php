@extends('App.layout')
@section('title', 'Dashboard')
@section('content')
    {{-- <div class=""> --}}
    <div class="relative min-w-full min-h-[60vh] rounded-lg"
        style="background-image: linear-gradient(to bottom, rgba(154, 219, 234, 0.35), rgba(39, 47, 44, 0.88)), url('{{ asset('image/backgrounds/bg' . rand(1, 4) . '.jpg') }}'); background-size: cover; background-position: top; background-repeat: no-repeat">
        {{-- Logo --}}
        <div class="w-full">
            <img src={{ url('/image/Logo.png') }} alt="Logo" class="absolute m-5  top-0 xl:w-1/6 lg:w-1/5 md:w-1/4 w-1/3">
        </div>
        <div class="w-full">
            <img src={{ url('/image/Logo.png') }} alt="Logo" class="absolute m-5  bottom-0 right-0 xl:w-1/6 lg:w-1/5 md:w-1/4 w-1/3">
        </div>
    </div>
    <div class="flex justify-center mt-10">
        <div class="h-1 w-[calc(80%)] bg-vetbrown rounded-full"></div>
    </div>

    {{-- Redes Sociales --}}
    <div class="flex justify-center">
        <div class="flex justify-center w-1/2 pt-10">
            {{-- Visión --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://www.facebook.com" target="_blank"
                        rel="noopener noreferrer"><img src={{ url('/image/facebook.png') }} alt="Vision"
                            class="w-full h-full transition duration-150 ease-in-out sm:hover:blur-sm"></a>
                </div>
            </div>
            {{-- Misión --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://www.youtube.com" target="_blank"
                        rel="noopener noreferrer"><img src={{ url('/image/youtube.png') }} alt="Mision"
                            class="w-full h-full transition duration-150 ease-in-out sm:hover:blur-sm"></a>
                </div>
            </div>
            {{-- Valores --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center  rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><img
                            src={{ url('/image/tiktok.png') }} alt="Valores"
                            class="w-full h-full transition duration-150 ease-in-out sm:hover:blur-sm"></a>
                </div>
            </div>
            {{-- Valores --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center  rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://wa.me/+51925941194" target="_blank" rel="noopener noreferrer"><img
                            src={{ url('/image/whatsapp.png') }} alt="Valores"
                            class="w-full h-full transition duration-150 ease-in-out sm:hover:blur-sm"></a>
                </div>
            </div>
        </div>
    </div>
@endsection
