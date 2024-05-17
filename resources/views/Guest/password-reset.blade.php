@extends('Guest.guest')
@section('content')
<div class="flex-col justify-center items-end h-full min-w-screen px-6 py-24">
<div class="flex justify-center items-center mb-10 md:translate-y-32">
    <img src={{ url('/image/Logo.png') }} alt="logo" class="rounded-full lg:w-1/6 md:w-1/5 sm:w-1/3 w-1/2">
</div>

      <!-- Right column container with form -->
      <div class="min-w-full flex justify-center items-center">
        <div class="py-20 md:w-8/12 lg:w-6/12 bg-vetwhite p-10 rounded-xl shadow-black md:translate-y-32 shadow-2xl md:rotate-3">
        <form method="POST" action="{{ route("password.update") }}">
          @csrf
          <!-- Password Reset Token -->
            <input type="hidden"
            name="token"
            value="{{ $request->route('token') }}"
            >
          <!-- Email input -->
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              name="email"
              type="text"
              value="{{ old('email', $request->email) }}"
              class="peer block min-h-[auto] w-full border-b-[1px] border-vetbrown bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-vetbrown placeholder:text-vetbrown [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Email address"
               readonly
              autocomplete="off"/>
            <label
              for="exampleFormControlInput3"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-vetbrown transition-all duration-200 ease-out -translate-y-[1.5rem] scale-[0.8] text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary"
              >{{ __('dictionary.email') }}
            </label>
          </div>

          <!-- Password input -->
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              name="password"
              type="password"
              class="peer block min-h-[auto] w-full border-b-[1px] border-vetbrown bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-vetbrown placeholder:text-vetbrown [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Password"
              required autofocus
              autocomplete="off"/>
            <label
              for="exampleFormControlInput33"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-vetbrown transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary"
              >{{ __('dictionary.password') }}
            </label>
          </div>

          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              name="password_confirmation"
              type="password"
              class="peer block min-h-[auto] w-full border-b-[1px] border-vetbrown bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-vetbrown placeholder:text-vetbrown [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Password" required autocomplete="off"/>
            <label
              for="exampleFormControlInput33"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-vetbrown transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary"
              >{{ __('dictionary.repeat_password') }}
            </label>
          </div>

          @if ($errors->any())
              <div class="alert alert-danger">
                  <ul>
                      @for ($i = 0; $i < count($errors->all()); $i++)
                          <li class="text-center dark:text-neutral-200 mb-2">{{ $errors->all()[$i] }}</li>
                      @endfor
                  </ul>
              </div>
          @endif
          @if (session('status'))
              <div class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                  {{ __('dictionary.link_sent') }}
              </div>
          @endif

          <!-- Submit button -->
          <button
            type="submit"
            class="text-center inline-block w-full rounded-full bg-vetgreen-respaldo px-7 pb-2.5 pt-3 text-sm font-bold uppercase leading-normal text-vetbrown shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            >
            {{ __('dictionary.reset_password') }}
          </button>
        </form>
        </div>
      </div>

  </div>
@endsection
