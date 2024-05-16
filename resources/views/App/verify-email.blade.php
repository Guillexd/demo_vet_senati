@extends('Guest.guest')
@section('content')
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 mx-2">
        <div class="rounded-full w-40 mx-auto hover:scale-[106%] transition">
            <div class="flex items-center justify-center mt-8 bg-black overflow-hidden mx-auto rounded-full h-40 w-40">
                <a href="https://wa.me/+51995578780" target="_blank" rel="noopener noreferrer" class="m-3 ms-4 cursor-zoom-in"
                    title="Presione para contactarse con el soporte técnico del sistema">
                    <img src="{{ url('/image/Logobgwhite.png') }}" class="scale-[160%]">
                </a>
            </div>
        </div>

        <div class="w-full sm:max-w-md mt-6 px-4 py-4 bg-gray-800 shadow-lg overflow-hidden sm:rounded-lg">
            <div class="mb-4 text-sm text-gray-400">
                {{ __('dictionary.message_email_verification') }}
            </div>

            @if (session('status') == 'verification-link-sent')
                <div class="mb-4 font-medium text-sm text-green-400">
                    {{ __('dictionary.link_sent') }}
                </div>
            @endif

            <div class="mt-4 flex items-center justify-between">
                <form method="POST" action="{{ route('verification.send') }}">
                    @csrf

                    <button type="submit" class="text-white font-semibold">
                        {{ __('dictionary.resent_email') }}
                    </button>
                </form>

                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit"
                        class="underline text-sm text-gray-400 hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                        {{ __('dictionary.logout') }}
                    </button>
                </form>
            </div>
        </div>
    </div>
@endsection
