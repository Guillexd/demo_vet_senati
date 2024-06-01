@extends('App.layout')
@section('title', 'Dashboard')
@section('content')
    <div class="flex flex-col min-w-full m-auto pb-10"
        style="background-image: linear-gradient(to bottom, rgba(154, 219, 234, 0.35), rgba(39, 47, 44, 0.88)), url('{{ asset('image/backgrounds/bg' . rand(1, 4) . '.jpg') }}'); background-size: contain; background-position: top; background-repeat: repeat">
        {{-- Logo --}}
        <div class="flex justify-center min-w-full">
            <img src={{ url('/image/Logo.png') }} alt="Logo" class="xl:w-1/6 lg:w-1/5 md:w-1/4 w-1/3">
        </div>
    </div>
    <div class="flex justify-center mt-10">
        <div class="h-1 w-[calc(80%)] bg-vetbrown rounded-full"></div>
    </div>
    <div class="flex flex-wrap justify-center min-w-full py-2 md:px-10">
        {{-- Visión --}}
        <div class="flex-col justify-center px-2 pt-10 w-96">
            <div class="flex justify-center items-center bg-vetorange-100 rounded-full mx-auto w-20 h-20 shadow-lg">
                <img src={{ url('/image/buscar.png') }} alt="Vision" class="w-1/2 h-1/2">
            </div>
            <p class="text-center py-4 font-bold">
                Visión
            </p>
            <p class="text-pretty">
                "La empresa ReyCan S.A.C. busca ser la empresa líder en la producción de cueros y camas para mascotas."
            </p>
        </div>
        {{-- Misión --}}
        <div class="flex-col justify-center px-2 pt-10 w-96">
            <div class="flex justify-center items-center bg-vetgreen-respaldo rounded-full mx-auto w-20 h-20 shadow-lg">
                <img src={{ url('/image/estadisticas.png') }} alt="Mision" class="w-1/2 h-1/2">
            </div>
            <p class="text-center py-4 font-bold">
                Misión
            </p>
            <p class="text-pretty">
                "La empresa ReyCan S.A.C. busca lazos comerciales que optimicen la marca en el mercado, también aspira a adquirir un terreno propio para la fábrica que cuente con la distancia adecuada para submuestra materia prima."
            </p>
        </div>
        {{-- Valores --}}
        <div class="flex-col justify-center px-2 pt-10 w-96 bg-blck">
            <div class="flex justify-center items-center bg-vetorange-200 rounded-full mx-auto w-20 h-20 shadow-lg">
                <img src={{ url('/image/estrella.png') }} alt="Valores" class="w-1/2 h-1/2">
            </div>
            <p class="text-center py-4 font-bold">
                Valores
            </p>
            <p class="text-pretty">
                "En nuestra empresa, la innovación, compromiso, colaboración, integridad, sostenibilidad y excelencia son
                los valores que guían cada acción y decision, creando un fundamento sólido para nuestro éxito en la industria de mascotas."
            </p>
        </div>
    </div>

    {{-- Redes Sociales --}}
    <div class="flex justify-center">
        <div class="flex justify-center w-1/2 pt-10">
            {{-- Visión --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img
                            src={{ url('/image/facebook.png') }} alt="Vision"
                            class="w-full h-full transition duration-150 ease-in-out sm:hover:blur-sm"></a>
                </div>
            </div>
            {{-- Misión --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><img
                            src={{ url('/image/youtube.png') }} alt="Mision"
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
