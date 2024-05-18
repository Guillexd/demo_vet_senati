@extends('Guest.guest')
@section('content')
    <div class="flex-col justify-center items-end h-full min-w-screen px-6 py-24">
        <div class="flex justify-center items-center mb-10">
            <img src={{ url('/image/Logo.png') }} alt="logo" class="rounded-full lg:w-1/6 md:w-1/5 sm:w-1/3 w-1/2">
        </div>
        <!-- Right column container with form -->
        <div class="min-w-full flex justify-center items-center">
            <div class="py-20 md:w-8/12 lg:w-6/12 bg-vetwhite p-10 rounded-xl shadow-black shadow-2xl md:rotate-3">
                <form method="POST" action="{{ route('login') }}" class="md:-rotate-3">
                    @csrf
                    <!-- Email input -->
                    <div class="relative mb-10" data-te-input-wrapper-init>
                        <input name="email" type="text" value="{{ old('email') }}"
                            class="peer block min-h-[auto] w-full border-b-[1px] border-vetbrown bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-vetbrown placeholder:text-vetbrown [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput3" placeholder="Email address" required autofocus autocomplete="off"
                            autocapitalize="off" />
                        <label for="exampleFormControlInput3"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-vetbrown transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary">{{ __('dictionary.email') }}
                        </label>
                    </div>

                    <!-- Password input -->
                    <div class="relative mb-10" data-te-input-wrapper-init>
                        <input name="password" type="password"
                            class="password peer block min-h-[auto] w-full border-b-[1px] border-vetbrown bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-vetbrown placeholder:text-vetbrown [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput33" placeholder="Password" required autocomplete="off" />
                        <label for="exampleFormControlInput33"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-vetbrown transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary">{{ __('dictionary.password') }}
                        </label>

                        <button type="button"
                            class="w-8 h-8 absolute top-0 right-0 hover:scale-125 transition-all cursor-pointer toogleButton">
                            <svg class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path
                                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path
                                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                            </svg>
                        </button>

                    </div>

                    <!-- Remember me checkbox -->
                    <div class="mb-6 flex items-center justify-between">
                        <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                                class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-vetbrown outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-vetbrown checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-dark checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="checkbox" name="remember" checked />
                            <label class="inline-block pl-[0.15rem] hover:cursor-pointer text-vetbrown" for="exampleCheck3">
                                {{ __('dictionary.remember') }}
                            </label>
                        </div>

                        <!-- Forgot password link -->
                        <a href="{{ route('password.request') }}"
                            class="ml-3 text-vetbrown hover:font-semibold text-end">{{ __('dictionary.forgot_password') }}</a>
                    </div>

                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @for ($i = 0; $i < count($errors->all()); $i++)
                                    <li class="text-center text-red-400 mb-2">{{ $errors->all()[$i] }}</li>
                                @endfor
                            </ul>
                        </div>
                    @endif


                    <!-- Submit button -->
                    <button type="submit"
                        class="text-center inline-block w-full rounded-full bg-vetgreen-respaldo px-7 pb-2.5 pt-3 text-sm font-bold uppercase leading-normal text-vetbrown shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init data-te-ripple-color="light">
                        {{ __('dictionary.sig_in') }}
                    </button>
                </form>

            </div>
        </div>
    </div>

    {{-- <div class="flex justify-center items-end overflow-hidden h-full min-w-screen px-6 py-24"
        style="background-image: linear-gradient(to bottom, rgba(154, 219, 234, 0.58), rgba(39, 47, 44, 1)), url('{{ asset('image/backgrounds/bg' . rand(1, 4) . '.jpg') }}'); background-size: cover; background-position: center; background-repeat: no-repeat">
        <!-- Right column container with form -->
        <div
            class="flex flex-col-reverse md:flex-row py-20 md:w-8/12 lg:ml-6 lg:w-6/12 bg-vetwhite p-10 rounded-xl shadow-black shadow-2xl translate-y-24 md:rotate-3">
            <div class="md:w-1/2">
                <form method="POST" action="{{ route('login') }}" class="md:-rotate-3">
                    @csrf
                    <!-- Email input -->
                    <div class="relative mb-10" data-te-input-wrapper-init>
                        <input name="email" type="text" value="{{ old('email') }}"
                            class="peer block min-h-[auto] w-full border-b-[1px] border-vetbrown bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-vetbrown placeholder:text-vetbrown [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput3" placeholder="Email address" required autofocus
                            autocomplete="off" />
                        <label for="exampleFormControlInput3"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-vetbrown transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary">{{ __('dictionary.email') }}
                        </label>
                    </div>

                    <!-- Password input -->
                    <div class="relative mb-10" data-te-input-wrapper-init>
                        <input name="password" type="password"
                            class="peer block min-h-[auto] w-full border-b-[1px] border-vetbrown bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-vetbrown placeholder:text-vetbrown [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput33" placeholder="Password" required autocomplete="off" />
                        <label for="exampleFormControlInput33"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-vetbrown transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-primary peer-valid:-translate-y-[1.5rem] peer-valid:scale-[0.8] peer-valid:text-primary">{{ __('dictionary.password') }}
                        </label>
                    </div>

                    <!-- Remember me checkbox -->
                    <div class="mb-6 flex items-center justify-between">
                        <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                                class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-vetbrown outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-vetbrown checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-dark checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="checkbox" name="remember" checked />
                            <label class="inline-block pl-[0.15rem] hover:cursor-pointer text-vetbrown" for="exampleCheck3">
                                {{ __('dictionary.remember') }}
                            </label>
                        </div>

                        <!-- Forgot password link -->
                        <a href="{{ route('password.request') }}"
                            class="ml-3 text-vetbrown hover:font-semibold text-end">{{ __('dictionary.forgot_password') }}</a>
                    </div>

                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @for ($i = 0; $i < count($errors->all()); $i++)
                                    <li class="text-center text-red-400 mb-2">{{ $errors->all()[$i] }}</li>
                                @endfor
                            </ul>
                        </div>
                    @endif


                    <!-- Submit button -->
                    <button type="submit"
                        class="text-center inline-block w-full rounded-full bg-vetgreen-200 px-7 pb-2.5 pt-3 text-sm font-bold uppercase leading-normal text-vetbrown shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init data-te-ripple-color="light">
                        {{ __('dictionary.sig_in') }}
                    </button>
                </form>
            </div>
            <div class="md:w-1/2 flex justify-center items-center mb-6 md:mb-0 md:-rotate-3 -translate-y-10">
                <img src="image/logonobg.png" alt="logo" class="rounded-full w-6/12 md:w-10/12">
            </div>
        </div>
    </div> --}}
@endsection