@extends('App.layout')
@section('title', 'Dashboard')
@section('content')
    {{-- <div class=""> --}}
    <div class="flex flex-col min-w-full m-auto pb-10"
        style="background-image: linear-gradient(to bottom, rgba(154, 219, 234, 0.35), rgba(39, 47, 44, 0.88)), url('{{ asset('image/backgrounds/bg' . rand(1, 4) . '.jpg') }}'); background-size: cover; background-position: top; background-repeat: no-repeat">
        {{-- Logo --}}
        <div class="flex justify-center min-w-full">
            <img src={{ url('/image/Logo.png') }} alt="Logo" class="xl:w-1/6 lg:w-1/5 md:w-1/4 w-1/3">
        </div>
        <p class="text-center text-vetwhite font-bold">"Tu visión, nuestro software</p>
        <p class="text-center text-vetwhite font-bold">Una alianza para el futuro"</p>
    </div>
    <div class="flex justify-center mt-10">
        <div class="h-1 w-[calc(80%)] bg-vetbrown rounded-full"></div>
    </div>
    <div class="flex flex-col sm:flex-row justify-between  min-w-full py-2 md:px-10">
        {{-- Visión --}}
        <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
            <div class="flex justify-center items-center bg-vetorange-100 rounded-full mx-auto w-20 h-20 shadow-lg">
                <img src={{ url('/image/buscar.png') }} alt="Vision" class="w-1/2 h-1/2">
            </div>
            <p class="text-center py-4 font-bold">
                Visión
            </p>
            <p class="text-center">
                "Ser líderes en el mercado peruano de desarrollo de software para el año 2030, reconocidos por nuestra
                capacidad de anticipar las necesidades tecnológicas, promoviendo la excelencia y el crecimiento sostenible."
            </p>
        </div>
        {{-- Misión --}}
        <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
            <div class="flex justify-center items-center bg-vetgreen-respaldo rounded-full mx-auto w-20 h-20 shadow-lg">
                <img src={{ url('/image/estadisticas.png') }} alt="Mision" class="w-1/2 h-1/2">
            </div>
            <p class="text-center py-4 font-bold">
                Misión
            </p>
            <p class="text-center">
                "Potenciar el progreso y la eficiencia en el tejido empresarial peruano a través del desarrollo de software
                innovador, contribuyendo a la transformación digital de las organizaciones en un plazo inmediato."
            </p>
        </div>
        {{-- Valores --}}
        <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
            <div class="flex justify-center items-center bg-vetorange-200 rounded-full mx-auto w-20 h-20 shadow-lg">
                <img src={{ url('/image/estrella.png') }} alt="Valores" class="w-1/2 h-1/2">
            </div>
            <p class="text-center py-4 font-bold">
                Valores
            </p>
            <p class="text-center">
                "En nuestra empresa, la innovación, compromiso, colaboración, integridad, sostenibilidad y excelencia son
                los valores que guían cada acción y decision, creando un fundamento sólido para nuestro éxito en el
                desarrollo de software."
            </p>
        </div>
    </div>
    {{-- Redes Sociales --}}
    <div class="flex justify-center">
        <div class="flex justify-center w-1/2 pt-10">
            {{-- Visión --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://www.facebook.com/people/Scriptify-Per%C3%BA/61556331095812/" target="_blank"
                        rel="noopener noreferrer"><img src={{ url('/image/facebook.png') }} alt="Vision"
                            class="w-full h-full transition duration-150 ease-in-out sm:hover:blur-sm"></a>
                </div>
            </div>
            {{-- Misión --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://www.youtube.com/channel/UCRCILIio1LR1mQst4lRRWsA" target="_blank"
                        rel="noopener noreferrer"><img src={{ url('/image/youtube.png') }} alt="Mision"
                            class="w-full h-full transition duration-150 ease-in-out sm:hover:blur-sm"></a>
                </div>
            </div>
            {{-- Valores --}}
            <div class="flex-col justify-center xl:px-20 lg:px-10 px-2 pt-10">
                <div class="flex justify-center items-center  rounded-full mx-auto w-10 h-10 shadow-lg">
                    <a href="https://www.tiktok.com/@scriptifyperu" target="_blank" rel="noopener noreferrer"><img
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
    {{-- </div> --}}
@endsection
