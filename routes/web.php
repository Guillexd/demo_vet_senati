<?php

use Illuminate\Support\Facades\Route;
use App\Providers\RouteServiceProvider;
use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmailVerificationPromptController;
use App\Http\Controllers\EmailVerificationNotificationController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\GenericController;
use App\Http\Controllers\GraphicController;
use App\Http\Controllers\IdentityDocumentController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Controllers\PasswordResetLinkController;
use App\Http\Controllers\NewPasswordController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\PetHistoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureCashRegisterIsOpen;
use App\Http\Middleware\EnsureJustOneCashRegisterIsOpen;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::redirect('/', RouteServiceProvider::HOME);

Route::middleware('guest')->group(function () {
    Route::get('/login', fn () => view('Guest.welcome'))->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:6,1');;
    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email')->middleware('throttle:6,1');;
    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.update')->middleware('throttle:6,1');;
});

Route::get('/email/verify', EmailVerificationPromptController::class)->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verification-notification', EmailVerificationNotificationController::class)->middleware(['auth', 'throttle:6,1'])->name('verification.send');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth')->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn () => view('App.home'));

    Route::view('/usuarios', 'App.User.index')->middleware(['can:admin']);
    Route::middleware(['can:admin'])->prefix('users')->controller(UserController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy');
    });

    Route::view('/clientes', 'App.Customer.index');
    Route::prefix('customers')->controller(CustomerController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy')->middleware(['can:admin']);
    });

    Route::view('/mascotas', 'App.Pet.index');
    Route::prefix('pets')->controller(PetController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::post('/update', 'update');
        Route::delete('/destroy', 'destroy')->middleware(['can:admin']);
    });

    Route::view('/servicios', 'App.Service.index');
    Route::prefix('services')->controller(ServiceController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store')->middleware(['can:admin']);
        Route::put('/update', 'update')->middleware(['can:admin']);
        Route::delete('/destroy', 'destroy')->middleware(['can:admin']);
    });

    Route::view('/razas', 'App.Breed.index');
    Route::prefix('breeds')->controller(BreedController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy')->middleware(['can:admin']);
    });

    Route::view('/historial-de-mascotas', 'App.PetHistory.index');
    Route::prefix('pet_histories')->controller(PetHistoryController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::post('/update', 'update');
        Route::delete('/destroy', 'destroy')->middleware(['can:admin']);
        Route::get('/get_next_date', 'getNextDate');
        Route::get('/get_plan_pdf', 'getPlanPdf');
    });

    Route::view('/inventario', 'App.Product.index');
    Route::prefix('products')->controller(ProductController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store')->middleware(['can:admin']);
        Route::post('/update', 'update')->middleware(['can:admin']);
        Route::delete('/destroy', 'destroy')->middleware(['can:admin']);
        Route::get('/by_due_date', 'getProductsByDueDate');
    });

    Route::view('/razones-de-egreso', 'App.Expense.index');
    Route::prefix('expenses')->controller(ExpenseController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy')->middleware(['can:admin']);
    });

    Route::view('/cajas', 'App.CashRegister.index');
    Route::prefix('cash_registers')->controller(CashRegisterController::class)->group(function () {
        Route::get('/list', 'list');
        Route::get('/get_products/{cash_register}', 'getProducts');
        Route::get('/get_services/{cash_register}', 'getServices');
        Route::get('/get_expenses/{cash_register}', 'getExpenses');
        Route::get('/get_all_vouchers', 'getAllVouchers');
        Route::get('/get_voucher/{cash_register}', 'getVoucher');
        Route::post('/store', 'storeInitialCashRegister')->middleware(['can:admin', EnsureJustOneCashRegisterIsOpen::class]);
        Route::post('/store_movements', 'storeMovements')
            ->middleware(EnsureCashRegisterIsOpen::class);
        Route::put('/update', 'update')
            ->middleware(['can:admin', EnsureJustOneCashRegisterIsOpen::class]);
        Route::put('/update_state', 'updateState');
        Route::delete('/destroy', 'destroy')
            ->middleware(['can:admin', EnsureCashRegisterIsOpen::class]);
        Route::delete('/destroy_movement', 'destroyMovement')
            ->middleware(['can:admin', EnsureCashRegisterIsOpen::class]);
        Route::delete('/destroy_voucher', 'destroyVoucher')
            ->middleware(['can:admin', EnsureCashRegisterIsOpen::class]);
        Route::get('/get_voucher_id', 'getVoucherId');
        Route::get('/get_voucher_pdf/{cash_register}', 'pdfVoucher');
        Route::get('/get_excel_by_cash_register', 'excelProducts')->middleware(['can:admin']);
        Route::get('/get_excel_by_month', 'excelByMonth')->middleware(['can:admin']);
    });

    Route::view('/graficos', 'App.Graphics.index')->middleware(['can:admin']);
    Route::middleware(['can:admin'])->prefix('graphics')->controller(GraphicController::class)->group(function(){
        Route::get('/list','list');
        Route::get('/get_excel_products_by_month','excelProductsByMonth');
    });

    Route::prefix('identity-documents')->group(function () {
        Route::get('/list', [IdentityDocumentController::class, 'list']);
    });

    Route::middleware(['can:admin'])->prefix('generic')->controller(GenericController::class)->group(function () {
        Route::post('/change-status', 'changeStatus');
    });

    Route::prefix('inquiry')->controller(InquiryController::class)->group(function () {
        Route::get('/ruc', 'getRUC');
        Route::get('/dni', 'getDNI');
    });
});
