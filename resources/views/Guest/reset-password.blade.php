@extends('Guest.guest')
@section('content')
<div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div class="flex justify-center items-center w-full">
        <img src={{ url('/image/Logo.png') }} alt="Logo" class="rounded-full w-3/4 md:w-1/5 lg:w-1/6">
    </div>

    <div class="max-w-md mt-6 px-6 py-4 bg-vetwhite shadow-lg overflow-hidden rounded-lg mx-2">
        <div class="mb-6 text-sm text-vetbrown">
            {{ __('dictionary.message_forgot_password') }}
        </div>

        <div class="mt-4 flex items-center justify-between">
            <form method="POST" action="{{ route('password.email') }}" class="w-full">
                @csrf
                <div class="relative mb-3">
                    <input
                      name="email"
                      type="text"
                      value="{{ old('email') }}"
                      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-vetbrown placeholder:text-vetbrown [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput3"
                      placeholder="Email address"
                      required autofocus
                      autocapitalize="off"
                      autocomplete="off"/>
                    <label
                      for="exampleFormControlInput3"
                      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-vetbrown transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary"
                      >{{ __('dictionary.email') }}
                    </label>
                </div>
                @if ($errors->any())
                    <div class="alert alert-danger mb-3">
                        <ul>
                            @for ($i = 0; $i < count($errors->all()); $i++)
                                <li class="text-center text-red-400 mb-2">{{ $errors->all()[$i] }}</li>
                            @endfor
                        </ul>
                    </div>
                @endif
                @if (session('status'))
                    <div class="mb-4 font-medium text-sm text-green-600">
                        {{ __('dictionary.link_sent') }}
                    </div>
                @endif
                <div class="flex items-center justify-between">
                    <button type="submit"
                    class="bg-vetgreen-respaldo text-vetbrown font-medium py-2 px-4 rounded shadow-lg transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                    {{ __('dictionary.recover_password') }}
                    </button>
                    <a href="{{ route('login') }}" class="underline text-sm text-vetbrown hover:font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                        {{ __('dictionary.sig_in') }}
                    </a>
                </div>
            </form>


        </div>
    </div>
</div>
@endsection
