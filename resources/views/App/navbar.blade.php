<nav>
    <a class='flex items-center mx-4 px-2 py-2 mt-4 {{ Request::is('dashboard') ? 'text-black drop-shadow-lg font-semibold border-b-2 border-black' : 'text-white font-semibold hover:text-black drop-shadow-lg' }}'
        href='{{ url('/dashboard') }}'>
        <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                d='M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'></path>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                d='M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'></path>
        </svg>

        <span class='mx-3'>Inicio</span>
    </a>
    @can('admin')
    <a class='flex items-center mx-4 px-2 py-2 mt-4 {{ Request::is('usuarios') ? 'text-black font-semibold border-b-2 border-black' : 'text-white font-semibold hover:text-black' }}'
        href='{{ Request::is('usuarios') ? '#' : url('/usuarios') }}'>
        <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
            viewBox='0 0 448 512'>
            <path
                d='M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z' />
        </svg>

        <span class='mx-3'>Usuarios</span>
    </a>
    @endif
    <a class='flex items-center mx-4 px-2 py-2 mt-4 {{ Request::is('clientes') ? 'text-black font-semibold border-b-2 border-black' : 'text-white font-semibold hover:text-black' }}'
        href='{{ Request::is('clientes') ? '#' : url('/clientes') }}'>
        <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
            viewBox="0 0 640 512">
            <path
                d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 160a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM144 256a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm312 40a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM226.9 491.4L200 441.5V480c0 17.7-14.3 32-32 32H120c-17.7 0-32-14.3-32-32V441.5L61.1 491.4c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6h19.5c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5V480c0 17.7-14.3 32-32 32H472c-17.7 0-32-14.3-32-32V441.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5V400c0 17.7-14.3 32-32 32H296c-17.7 0-32-14.3-32-32V345.5l-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
        </svg>

        <span class='mx-3'>Clientes</span>
    </a>

    <div class="relative overflow-hidden mx-4 mt-1">
        <label
            class="toggle flex items-center w-full px-2 mt-4 cursor-pointer text-white font-semibold hover:text-black">

            <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor' viewBox="0 0 640 512">
                <path d="M36.8 192H603.2c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0H121.7c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224V384v80c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V384 224H320V384H128V224H64zm448 0V480c0 17.7 14.3 32 32 32s32-14.3 32-32V224H512z"/>
            </svg>

            <span class="mx-3">Veterinaria</span>
            <svg class="w-4 h-4 transition-all ease-in arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" stroke="currentColor">
                <path
                    d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
        </label>

        <div
        class="rounded-lg mt-2 h-0 transition-all ease-out duration-700 {{ Request::is('mascotas') || Request::is('historial-de-mascotas') || Request::is('razas')  ? 'menu' : '' }}">

            <a class='flex items-center mx-1 pl-1 py-2 {{ Request::is('mascotas') ? 'text-black font-semibold border-b-2 border-black' : 'text-white hover:text-black' }}'
                href='{{ Request::is('mascotas') ? '#' : url('/mascotas') }}'>
                &#8226
                <svg class='ml-2 w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
                    viewBox="0 0 576 512">
                    <path
                        d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80H464 448 426.7l-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h30 16H303.8L416 256.1zM464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z" />
                </svg>

                <span class='mx-3'>Mascotas</span>
            </a>

            <a class='flex items-center mx-1 pl-1 py-2 {{ Request::is('historial-de-mascotas') ? 'text-black font-semibold border-b-2 border-black' : 'text-white hover:text-black' }}'
                href='{{ Request::is('historial-de-mascotas') ? '#' : url('/historial-de-mascotas') }}'>
                &#8226
                <svg class='ml-2 w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
                    viewBox="0 0 448 512">
                    <path
                        d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                </svg>

                <span class='mx-3 truncate'>Historial (mascotas)</span>
            </a>

            <a class='flex items-center mx-1 pl-1 py-2 {{ Request::is('razas') ? 'text-black font-semibold border-b-2 border-black' : 'text-white hover:text-black' }}'
                href='{{ Request::is('razas') ? '#' : url('/razas') }}'>
                &#8226
                <svg class='mx-2 w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
                    viewBox="0 0 512 512">
                    <path
                        d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM160 154.4c0-5.8 4.7-10.4 10.4-10.4h.2c3.4 0 6.5 1.6 8.5 4.3l40 53.3c3 4 7.8 6.4 12.8 6.4h48c5 0 9.8-2.4 12.8-6.4l40-53.3c2-2.7 5.2-4.3 8.5-4.3h.2c5.8 0 10.4 4.7 10.4 10.4V272c0 53-43 96-96 96s-96-43-96-96V154.4zM216 288a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm96-16a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z" />
                </svg>

                <span class='mx-1'>Razas</span>
            </a>
        </div>
    </div>

    <a class='flex items-center mx-4 px-2 py-2 mt-4 {{ Request::is('inventario') ? 'text-black font-semibold border-b-2 border-black' : 'text-white font-semibold hover:text-black' }}'
        href='{{ Request::is('inventario') ? '#' : url('/inventario') }}'>
        <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
            viewBox="0 0 576 512">
            <path
                d="M153.7 144.8c6.9 16.3 20.6 31.2 38.3 31.2H384c17.7 0 31.4-14.9 38.3-31.2C434.4 116.1 462.9 96 496 96c44.2 0 80 35.8 80 80c0 30.4-17 56.9-42 70.4c-3.6 1.9-6 5.5-6 9.6s2.4 7.7 6 9.6c25 13.5 42 40 42 70.4c0 44.2-35.8 80-80 80c-33.1 0-61.6-20.1-73.7-48.8C415.4 350.9 401.7 336 384 336H192c-17.7 0-31.4 14.9-38.3 31.2C141.6 395.9 113.1 416 80 416c-44.2 0-80-35.8-80-80c0-30.4 17-56.9 42-70.4c3.6-1.9 6-5.5 6-9.6s-2.4-7.7-6-9.6C17 232.9 0 206.4 0 176c0-44.2 35.8-80 80-80c33.1 0 61.6 20.1 73.7 48.8z" />
        </svg>

        <span class='mx-3'>Productos</span>
    </a>

    <a class='flex items-center mx-4 px-2 py-2 mt-4 {{ Request::is('servicios') ? 'text-black font-semibold border-b-2 border-black' : 'text-white font-semibold hover:text-black' }}'
        href='{{ Request::is('servicios') ? '#' : url('/servicios') }}'>
        <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
            viewBox="0 0 512 512">
            <path
                d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM160.9 286.2c4.8 1.2 9.9 1.8 15.1 1.8c35.3 0 64-28.7 64-64V160h44.2c12.1 0 23.2 6.8 28.6 17.7L320 192h64c8.8 0 16 7.2 16 16v32c0 44.2-35.8 80-80 80H272v50.7c0 7.3-5.9 13.3-13.3 13.3c-1.8 0-3.6-.4-5.2-1.1l-98.7-42.3c-6.6-2.8-10.8-9.3-10.8-16.4c0-2.8 .6-5.5 1.9-8l15-30zM160 160h40 8v32 32c0 17.7-14.3 32-32 32s-32-14.3-32-32V176c0-8.8 7.2-16 16-16zm128 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z" />
        </svg>

        <span class='mx-3'>Servicios</span>
    </a>

    <a class='flex items-center mx-4 px-2 py-2 mt-4 {{ Request::is('razones-de-egreso') ? 'text-black font-semibold border-b-2 border-black' : 'text-white font-semibold hover:text-black' }}'
        href='{{ Request::is('razones-de-egreso') ? '#' : url('/razones-de-egreso') }}'>
        <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
            viewBox="0 0 448 512">
            <path
                d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
        </svg>

        <span class='mx-3'>Razones de egresos</span>
    </a>

    <a class='flex items-center mx-4 px-2 py-2 mt-4 {{ Request::is('cajas') ? 'text-black font-semibold border-b-2 border-black' : 'text-white font-semibold hover:text-black' }}'
        href='{{ Request::is('cajas') ? '#' : url('/cajas') }}'>
        <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
            viewBox="0 0 512 512">
            <path
                d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z" />
        </svg>

        <span class='mx-3'>Caja</span>
    </a>
    @can('admin')
    <a class='flex items-center mx-4 px-2 py-2 mt-4 {{ Request::is('graficos') ? 'text-black font-semibold border-b-2 border-black' : 'text-white font-semibold hover:text-black' }}'
        href='{{ Request::is('graficos') ? '#' : url('/graficos') }}'>
        <svg class='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='currentColor'
            viewBox="0 0 448 512">
            <path
                d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
        </svg>

        <span class='mx-3'>Estadísticas</span>
    </a>
    @endif
</nav>
