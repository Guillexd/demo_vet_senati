<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

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
    <title>Iniciar sesión ReyCan</title>
    @vite(['resources/css/app.css'])
    <link rel="manifest" crossorigin="use-credentials" href="{{ @url('/build/manifest.webmanifest') }}">
    <script id="vite-plugin-pwa:register-sw" src="{{ @url('/build/registerSW.js') }}"></script>
</head>

<body class="antialiased"
    style="background-image: linear-gradient(to bottom, rgba(154, 219, 234, 0.58), rgba(39, 47, 44, 1)), url('{{ asset('image/backgrounds/bg' . rand(1, 4) . '.jpg') }}'); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed; height: 100vh;">
    <section class="h-screen">
        @yield('content')
    </section>
</body>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.password').forEach((passwordInput, index) => {
            const toggleButton = document.querySelectorAll('.toogleButton')[index];
            const eye = toggleButton.firstElementChild;

            toggleButton.addEventListener('click', function() {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    eye.classList.remove('hidden');
                    eye.nextElementSibling.classList.add('hidden');
                } else {
                    passwordInput.type = 'password';
                    eye.classList.add('hidden');
                    eye.nextElementSibling.classList.remove('hidden');
                }
            });
        });
    })
</script>

</html>
