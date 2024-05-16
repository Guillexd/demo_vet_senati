@extends('Guest.guest')
@section('content')
<div class="container h-full px-6 py-24">
    <div
      class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <!-- Left column container with background-->
      <div class="md:w-8/12 lg:w-6/12 mx-auto">
        <img
          src="data:image/png;base64,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"
          class="w-full rounded-lg"
          alt="Login image" />
      </div>

      <!-- Right column container with form -->
      <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
        <form method="POST" action="{{ route("register") }}">
          @csrf
          <!-- Email input -->
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              name="name"
              type="text"
              value="{{ old('name') }}"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput3"
              placeholder="Name" 
              required 
              autocomplete="off"/>
            <label
              for="exampleFormControlInput3"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary"
              >{{ __('dictionary.name') }}
            </label>
          </div>

          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              name="email"
              type="text"
              value="{{ old('email') }}"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Email address" 
              required 
              autocomplete="off"/>
            <label
              for="exampleFormControlInput3"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary"
              >{{ __('dictionary.email') }}
            </label>
          </div>

          <!-- Password input -->
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              name="password"
              type="password"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Password" 
              required 
              autocomplete="off"/>
            <label
              for="exampleFormControlInput33"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary"
              >{{ __('dictionary.password') }}
            </label>
          </div>

          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
              name="password_confirmation"
              type="password"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Password" required autocomplete="off"/>
            <label
              for="exampleFormControlInput33"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary"
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
      

          <!-- Submit button -->
          <button
            type="submit"
            class="text-center inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-slate-700 dark:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            >
            {{ __('dictionary.register') }}
          </button>

          <a
            href="{{ route('login') }}"
            class="text-center inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-slate-700 dark:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            >
            {{ __('dictionary.already_registered') }}
          </a>

          <!-- Divider -->
          <div
            class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200 uppercase ">
              {{ __('dictionary.or') }}
            </p>
          </div>

          <!-- Social login buttons -->
          <a
            class="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            style="background-color: #3b5998"
            href="#!"
            role="button"
            data-te-ripple-init
            data-te-ripple-color="light">
            <!-- Facebook -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            Continue with Facebook
          </a>
          <a
            class="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
            style="background-color: #55acee"
            href="#!"
            role="button"
            data-te-ripple-init
            data-te-ripple-color="light">
            <!-- Twitter -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            Continue with Twitter
          </a>
        </form>
      </div>
    </div>
  </div>
@endsection