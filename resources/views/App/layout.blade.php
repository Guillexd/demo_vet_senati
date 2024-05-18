<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="description"
        content="Veterinaria ReyCan - Atención integral para tus mascotas, servicios de emergencia, consultas, vacunación y más.">
    <meta name="keywords"
        content="veterinaria, cuidado de mascotas, servicios veterinarios, emergencia veterinaria, consultas veterinarias, vacunación de mascotas, huancayo">
    <meta name="author" content="Veterinaria ReYcan">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Veterinaria ReYcan - Cuidado Integral para tus Mascotas">
    <meta property="og:description"
        content="Atención integral para tus mascotas, servicios de emergencia, consultas, vacunación y más.">
    <meta property="og:image" content="{{ @url('/image/backgrounds/bg1.jpg') }}">
    <meta property="og:url" content="https://www.senati.scriptify-peru.com">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Veterinaria XYZ">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Veterinaria XYZ - Cuidado Integral para tus Mascotas">
    <meta name="twitter:description"
        content="Atención integral para tus mascotas, servicios de emergencia, consultas, vacunación y más.">
    <meta name="twitter:image" content="{{ @url('/image/backgrounds/bg1.jpg') }}">
    <meta name="twitter:site" content="@VeterinariaReyCan">

    <!-- Additional SEO Tags -->
    <link rel="canonical" href="https://www.senati.scriptify-peru.com">
    <meta name="robots" content="index, follow">
    <meta name="language" content="es">
    <meta name="geo.region" content="PE-JUN"> <!-- Código ISO 3166-2 para Junín -->
    <meta name="geo.placename" content="Huancayo">
    <meta name="geo.position" content="-12.0653;-75.2048"> <!-- Coordenadas de Huancayo -->
    <meta name="ICBM" content="-12.0653, -75.2048">

    <link rel="icon" href="/icons/Logo32.png" type="image/png">
    <title>@yield('title')</title>
    @viteReactRefresh
    @vite(['resources/js/app.js', 'resources/css/app.css'])
    <link rel="manifest" crossorigin="use-credentials" href="{{ @url('/build/manifest.webmanifest') }}">
    <script id="vite-plugin-pwa:register-sw" src="{{ @url('/build/registerSW.js') }}"></script>
</head>

<body class="bg-vetwhite">
    <div x-data="{ sidebarOpen: false }" class="flex bg-vetwhite h-screen">
        <div :class="sidebarOpen ? 'block' : 'hidden'" @click="sidebarOpen = false"
            class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 xl:hidden"></div>

        <div :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
            class="fixed inset-y-0 left-0 z-30 w-[17rem] overflow-y-auto transition duration-300 transform bg-indigo-400 xl:translate-x-0 xl:static xl:inset-0">

            <div class="rounded-full w-32 mx-auto hover:scale-[106%] transition">
                <div
                    class="flex items-center justify-center mt-4 overflow-hidden mx-auto rounded-full h-32 w-32 border border-black">
                    <a href="https://wa.me/+51925941194" target="_blank" rel="noopener noreferrer"
                        class="m-3 ms-4 cursor-zoom-in"
                        title="Presione para contactarse con el soporte técnico del sistema">
                        <img src="{{ url('/image/Logobgwhite.png') }}" class="scale-[180%] hover:bg-vetwhite">
                    </a>
                </div>
            </div>

            @include('App.navbar')

        </div>

        <div class="flex flex-col flex-1 overflow-hidden min-h-screen">
            <header class="flex items-center justify-between px-6 py-4 bg-vetwhite border-b-4 border-vetgreen-200">
                <div class="flex items-center">
                    <button @click="sidebarOpen = true" class="text-gray-500 focus:outline-none xl:hidden">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>

                <div class="flex items-center">
                    <div x-data="{ dropdownOpen: false }" class="relative">
                        <button @click="dropdownOpen = ! dropdownOpen"
                            class="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                            <img class="object-cover w-full h-full"
                                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80"
                                alt="Your avatar">
                        </button>

                        <div x-show="dropdownOpen" @click="dropdownOpen = false"
                            class="fixed inset-0 z-10 w-full h-full" style="display: none;"></div>

                        <div x-show="dropdownOpen"
                            class="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl"
                            style="display: none;">
                            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
                                {{ auth()->user()->name }} </a>
                            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
                                Rol: {{ auth()->user()->rol->name }}
                            </a>
                            <form action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button id="logout" type="submit"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white w-full text-left">
                                    {{ __('dictionary.logout') }}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            <main
                class="container px-6 py-8 mx-auto overflow-y-auto h-full scrollbar scrollbar-thumb-vetgreen-200 scrollbar-track-vetgreen-100">
                @yield('content')
            </main>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const indicators = document.querySelectorAll('.arrow');

            indicators.forEach((indicator) => {
                indicator.style.transform = "rotate(-90deg)";
                const menuItem = indicator.parentElement.nextElementSibling;
                const toggle = indicator.closest('.toggle')

                if (menuItem.classList.contains('menu')) {
                    menuItem.style.height = `${menuItem?.scrollHeight}px`
                    indicator.style.transform = "rotate(0deg)";
                }

                toggle.addEventListener('click', () => {
                    let menu = toggle.nextElementSibling
                    let height = menu.scrollHeight
                    let deg = 0
                    if (menu.clientHeight != "0") {
                        height = 0
                        deg = -90
                    }
                    indicator.style.transform = `rotate(${deg}deg)`
                    menu.style.height = `${height}px`
                })
            })
        })
    </script>
</body>

</html>
