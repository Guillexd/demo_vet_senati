<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/icons/Logo32.png" type="image/png">
    <title>Iniciar sesión</title>
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
        const passwordInput = document.querySelector('.password');
        const toggleButton = document.querySelector('.toogleButton');
        const eye = toggleButton.firstElementChild

        toggleButton.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eye.classList.remove('hidden')
                eye.nextElementSibling.classList.add('hidden')
            } else {
                passwordInput.type = 'password';
                eye.classList.add('hidden')
                eye.nextElementSibling.classList.remove('hidden')
            }
        });
    })
</script>

</html>
